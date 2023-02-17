/** @jsx jsx */
import { AllWidgetSettingProps } from 'jimu-for-builder'
import { MapWidgetSelector } from 'jimu-ui/advanced/setting-components'
import { IMConfig } from '../config'
import { Label, TextInput, TextArea, Checkbox } from 'jimu-ui'
import { jsx, css } from 'jimu-core'

const containerCss = css`
  display: flex;
  flex-direction: column;
  padding: 5px;
}
`

interface ExtraProps {
  myLayers: string[];
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

  // changement parametre
  const onMyLayersChanged = ( value: string) => {
    // Save the parameter to config 
    onSettingChange({
      id: id,
      config: {
        ...config,
        myLayers: value.split('\n').map(layerName => layerName.trim() )
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

    <Label>
     Layers or group layer to be filtered (one line per layer) : 
     <TextArea
        onAcceptValue={onMyLayersChanged}
        defaultValue={props.config.myLayers.join('\n')}
        height={150}
        />
      </Label>

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

