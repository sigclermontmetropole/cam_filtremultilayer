# A Widget for ExperienceBuilder for ArcGis
This widget add buttons for filtering data on several layers at once.
Each button is associated with an sql filter that will be applied to a list of layer.
You can also apply this filter to layers in a group of layer or in an image layer.

## Installation
Copy this directory in the widget folder of your Experience Builder client.
See : https://doc.arcgis.com/en/experience-builder/11.0/configure-widgets/add-custom-widgets.htm

## Configuration
The settings of the widget :
- Select a map to link to the widget
- Type the name of the layers (the name in the map) : one line per layer in setting text area. For group an image layer, type only the name of the group layer, not the names of its children layers. Filter will be applied to all the children.
- Filters settings : two text lines per button, one for the displayed text of the button, and another for the sql filter that will be applied when you click on the button.
- Choose horizontal or vertical disposition for the buttons