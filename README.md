# TrackMyThing
Simple NodeJS Rest API to receive requests from arduino input modules.


Update weather on the current timestamp by sending to route /trackmything/tmp/update a JSON object formatted:

{
  "apiKey": <apiKey>
  "data": {
    "temperature": <float>,
    "humidity": <float>
  }
}


Receive weather for the most recent 500 entries by sending to route /trackmything/tmp/get a JSON object formatted:

{
	"apiKey": <apiKey>
}
