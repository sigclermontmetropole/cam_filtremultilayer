/** @jsx jsx */
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import { DataSourceSelector } from 'jimu-ui/advanced/data-source-selector'
import { useEffect, useRef, useState } from 'react'
import { IMConfig } from '../config'
import { Label, TextInput, TextArea, Checkbox } from 'jimu-ui'
import { jsx, css, DataSource, UseDataSource, ImmutableArray, Immutable, AllDataSourceTypes, ImmutableObject, DataSourceJson } from 'jimu-core'
import { FeatureLayerDataSource } from 'jimu-arcgis'

const containerCss = css`
  display: flex;
  flex-direction: column;
  padding: 5px;
}
`

// settings interfaces
interface ExtraProps {
  buttonFilters: string[];
  vertical: boolean;
}

export default function Setting(props: AllWidgetSettingProps<IMConfig> & ExtraProps) {

  const { onSettingChange, id, config, useDataSources } = props

  const onSelectMap = (useMapWidgetIds: string[]) => {
    onSettingChange({
      id: id,
      useMapWidgetIds: useMapWidgetIds
    })
  }

  //Direction du menu : vertical ou horizontal
  const onCheckBoxDirectionChanged = (event, value: boolean ) => {
    // Save the parameter to config 
    onSettingChange({
      id: id,
      config: {
        ...config,
        vertical: value
        }
    })    

  }

  // changement parametre (1 ligne par valeur du tableau de chaine)
  const onButtonFiltersChanged = ( value: string) => {
    // Save the parameter to config 
    onSettingChange({
      id: id,
      config: {
        ...config,
        buttonFilters: value.split('\n')
       }
    })
  }  

  // changement des sources de données
  const onDataSourceChange = (useDataSources: UseDataSource[]) => {

    if (!useDataSources) {
      return;
    }    

    props.onSettingChange({
      id: props.id,
      config: config,
      useDataSources: useDataSources
    })

  }


  return (
    <div css={containerCss}>
    <Label>
      Select the map to which filtering will be applied
        <MapWidgetSelector
          onSelect={onSelectMap}
          useMapWidgetIds={props.useMapWidgetIds}
        />
    </Label>

    <Label centric check>
    <Checkbox
      checked={props.config.vertical}
      className="mr-2"
      onChange={onCheckBoxDirectionChanged}
    />
     Vertical menu
    </Label>

    <DataSourceSelector
        types={Immutable([AllDataSourceTypes.FeatureLayer])}
        useDataSourcesEnabled mustUseDataSource
        isMultiple={true}
        useDataSources={props.useDataSources}
        onChange={onDataSourceChange}
        widgetId={props.id}
        hideAddDataButton={true}
    />

    <Label>
      Filters : 1 line for button title, 1 line for SQL filter related to this button, and so on
      <TextArea 
          onAcceptValue={onButtonFiltersChanged}
          defaultValue={props.config.buttonFilters.join('\n')}
          height={500}
      />
    </Label>

      </div>
  )
}

