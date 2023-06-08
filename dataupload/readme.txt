How to Update Data to Generate Central Basin 3D Wells

##########################################################################################################################################
1. Import GAMA Data

	1.	Download data from GAMA Downloads for Los Angeles County. You can download “All data” or download by individual sources. If you download “all data” use “Import GAMA All tool and ensure that all sources that should be available are. If you download by source use the “Import GAMA by Source” tool, also be sure to inspect the size of the files to see if there are any sources with missing data.
Historically, there were two versions of this data;
		a.	Version 2
		b.	Version 3 – This data was taken down temporarily to address modifiers and 4/19/2023. There is no date of when this 			version will return.
########################################################################################################################################## 

2. Import GAMA by Source 
 
	Extract zipped GAMA downloads to a single folder. This tool iterates through the files stored in a folder, plots and merges the data into a single layer and clips to the Central Basin extent. The output of this tool will result in individual layers for each iteration plus a combined layer designated as “all”.
	*In the future we might consider including a delete the individual layers provided they have successfully joined. I chose to keep all of the layers while I was testing, but this may not be necessary in the future.
 
 OR

2. Import GAMA All

	Extract zipped GAMA all download to a selected location. This tool plots the data and clips to the extent. The output is a single layer. Once this step is complete be sure to look at the sources of the data to make sure you have what you need. 

##########################################################################################################################################
4. Remove Missing Depth Rows

	The input for this tool is the Gama All layer that resulted from the previous step (Import GAMA by Source or Import GAMA All). This tool selects the rows that don't have depth information and removes them so that we are not moving around as much volume. In previous versions this step has been created later in the script.
	*In the future I would like to remove any extra fields that we are not using, but need to get DEV approval prior to this adjustment. This would also help improve processing time. “SRC_” fields should be exact duplicates for the “GM_” fields. The GM fields are what the previous script ran on as well as what this model runs on.

##########################################################################################################################################
 
5. Run through DEM

	This process runs from the output of Remove Missing Depth Rows and a DEM (I used the one called Mosaic DEM). This tool finds where the well locations (x,y) cross the ground surface (z), then creates and populates a fields (Z) that shows the approximate elevation for the top of each well. Note this tool uses the units from the DEM to calculate Z. If your DEM is in meters, the Add Calculate Fields model will create a field called “ZinFeet” that adjusts for units. If your DEM is already in feet, after the next step has been run, adjust the results accordingly.
 	This step takes several hours to run.

##########################################################################################################################################
 
6. Add Calculate Fields 

The input should be the result of the prior process (Run through DEM). This step Adds multiple fields and calculates necessary information to symbolize wells;
	1.	ZinFeet – calculates the top of the well in feet (DEM is typically in meters)
	2.	ElevationBottomofWellFeet – calculates the bottom of the well in relation to the ground surface (ZinFeet) based on either the bottom of the screen or the total depth of the well. 
			2.1.If screen depth is not null then there is screen depth information so calculate field based on bottom of screen (ZinFeet - GM_BOTTOM_DEPTH_OF_SCREEN_FT)
			2.2.If screen depth is null and well depth is not null, there is no screen depth, but there is a total depth, calculate field based on total depth (ZinFeet - GM_WELL_DEPTH_FT)
	3.	BottomCalcMethod – includes informational text showing which method was used to find the well depth (ElevationBottomofWellFeet)
	4.	Adds a Global ID field – this was included in the last version so I also included it here.
 
 	Note: it should always be the first option to calculate using the bottom of the screen because this is the most accurate way to portray context for where the water is coming from. There are occasions when the total depth of a well is deeper than the screen, when sampling the water is still coming from the lowest part of the screen regardless of where the bottom of the well or borehole is.
	*This process might be better served by using an iterator or four loop rather than select layer by attribute here.

##########################################################################################################################################

Optional: Subset Function
	To subset the results by any fields the subset function is provided that makes a copy of the input based on a field selections.
##########################################################################################################################################
