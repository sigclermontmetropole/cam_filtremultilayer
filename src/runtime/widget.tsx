/** @jsx jsx */
/** @jsxFrag React.Fragment */
import { AllWidgetProps, IMState, css, jsx, React, SqlQueryParams, DataSourceManager } from 'jimu-core'
import { useEffect, useRef, useState } from 'react'
import { IMConfig } from '../config'
import { FeatureLayerDataSource, JimuMapView, JimuMapViewComponent } from 'jimu-arcgis'
import { Label, Button, ButtonGroup } from 'jimu-ui'
import FeatureLayer from 'esri/layers/FeatureLayer'
import GroupLayer from 'esri/layers/GroupLayer'
import MapImageLayer from 'esri/layers/MapImageLayer'
import Sublayer from "esri/layers/support/Sublayer";
import { setFluidGetter } from '@react-spring/shared'
import { processSpatialReference } from 'esri/rest/geoprocessor/GPOptions'
import { layer } from 'esri/views/3d/support/LayerPerformanceInfo'
import { isNull } from 'lodash-es'


const containerCss = css`
  display: flex;
  flex-direction: column;
  padding: 5px;
}
`

export default function Widget (props: AllWidgetProps<IMConfig> ) {

  const [jmv, setJmv] = useState<JimuMapView>(null)
  //filtre sélectionné
  const [selectedFilter, setSelectedFilter] = useState<number>(0)

  const onActiveViewChange = (jmv: JimuMapView) => {
    if (!isNull(jmv)) setJmv(jmv) ;
  }

  const renderData = () => {
    return <label>  Tableau complet : {props.config.buttonFilters.join('\n')} </label>
  }

  // impose un filtre sur entites
  // https://developers.arcgis.com/javascript/latest/api-reference/esri-layers-FeatureLayer.html#definitionExpression
  const setFilter = (event, index) => {
    setSelectedFilter(index); 

    //selected datasources
    console.log("   DEBUG : " + JSON.stringify( props ));
    for (var i=0; i<props.useDataSources.length; i++) {
        // console.log("   DEBUG : " + JSON.stringify( props.useDataSources[i] ) )
        //filter
        var query: SqlQueryParams = {
          where: props.config.buttonFilters[index * 2 + 1]
        };
        //apply filter to dataSource
        var ds = DataSourceManager.getInstance().getDataSource(props.useDataSources[i].dataSourceId) as FeatureLayerDataSource;
        ds.updateQueryParams( query, props.id)
    }
    return;

    const layers = jmv.view.map.allLayers;
    const pAll = Promise.all(layers.filter((layer) => {
      //return layer.type === 'feature' ;
      //Couche d'entité dont le nom est dans la liste des couches souhaitées
      //console.log("DEBUG LAYER concerné ? " + layer.title 
       // + (layer.type == 'feature' && props.config.myLayers.split(',').includes(layer.title) ) ) ; 
      return (props.config.myLayers.includes(layer.title) ) ;
        
    })
      .map(async (layer): Promise<String> => {
        console.log("      DEBUG : filtered layer : " + layer.title + " of type " + layer.type ) ;
        if (layer.type == 'feature') {
          const fl = layer as FeatureLayer;
          console.log("           DEBUG feature layer - SQL filter before change = " + fl.definitionExpression)
          fl.definitionExpression = props.config.buttonFilters[index * 2 + 1] ; 
        }
        // groupe de feature layer
        else if (layer.type == 'group') {
          const group = layer as GroupLayer
          group.layers.filter( (layer) => { return (layer.type == 'feature') } )
            .map( (fl:FeatureLayer) => {
              console.log("             DEBUG : filtered sublayer : " + layer.title ) ;
              fl.definitionExpression = props.config.buttonFilters[index * 2 + 1] ; 
            } )
        }
        // groupe image layer
        else if (layer.type == 'map-image') {
          const group = layer as MapImageLayer
          group.allSublayers.filter( (layer) => { return true } )
            .map( (fl:Sublayer) => {
              console.log("             DEBUG : filtered mapimage sublayer  : " + layer.title ) ;
              fl.definitionExpression = props.config.buttonFilters[index * 2 + 1] ; 
            } )
        }

        return 'OK';
      }))
  }

  useEffect(() => {

    //impose le premier filtre  aux données
    if ( isNull(!jmv) ) {
      setFilter(null, selectedFilter);
    }

  }, [jmv])

  return (
    <>

    <ButtonGroup
      size="default"
      vertical={props.config.vertical}
    >
    { 
      props.config.buttonFilters.filter( (item, index) => index % 2 == 0).map( (item, index) =>  ( 
          <Button
          id=  { "FilterButton"  + index}
          onClick={(e) => setFilter(e, index)}
          size="default"
          active={index==selectedFilter}
          disabled={isNull(jmv)}
          >
          {item}
        </Button>
        )
      )
    }
  </ButtonGroup>

      {props
        .useMapWidgetIds &&
            <JimuMapViewComponent
        useMapWidgetId={props.useMapWidgetIds[0]}
        onActiveViewChange = {onActiveViewChange}
        />
      }  

    </>
  )
};

