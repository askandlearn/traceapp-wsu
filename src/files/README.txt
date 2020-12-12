There are two types of data files


1) BeatFeatures.csv

Most of the time, we will plot the information in the BeatFeatures.csv
This has information on each heartbeat

Time: time (float) from beginning of recording
HR: heart rate (integer)
IBI: interbeat interval (integer) in milliseconds
PAMP: pulse amplitude of systole (integer).  Indicates the volume of blood flow  
DAMP: differential amplitude (integer).  Indicates the strength of heart contractions. 
ET: ejection time (integer).  Duration of systole in milliseconds.
SP: systole peak value (integer)
PV: pulse volume (integer)
PR: perfusion rate (integer)
PI: perfusion index (float)



2) RawData has high resolution data for detailed diagnostics

We may sometimes want to plot raw data. 

Time: time (float) from beginning of recording
PPG: raw data from TRACE blood flow sensor (integer).  This is often referred to as teh photoplethsymogram
AccX: Accelerometer signal indicating movement. (integer)  
PVW: Pulse volume waveform (integer)
PWWD1: first derivative of PVW (integer)
DIG: binary (1 or 0).  1 indicates systole, 2 indicates diastole. 
ST: skin temperature (integer, given in degrees celsius).  This signal may need to be averaged over the last 50 points to get a good signal. 


