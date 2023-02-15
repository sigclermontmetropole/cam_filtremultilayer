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
  myLayers: string;
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
        myLayers: value
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
      Sélectionner le widget carte
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
     Menu vertical
    </Label>

    <Label>
     Couches à filtrer (noms des couches séparés par une virgule) : 
     <TextInput
        onAcceptValue={onMyLayersChanged}
        type="text"
        defaultValue={props.config.myLayers}
        />
      </Label>

    <Label>
      Filtres à appliquer : 1 ligne pour le titre du filtre, 1 ligne pour le filtre SQL, et on recommence tant qu'on a des filtres à rajouter
      <TextArea 
          onAcceptValue={onButtonFiltersChanged}
          defaultValue={props.config.buttonFilters.join('\n')}
          height={500}
      />
    </Label>

      </div>
  )
}

