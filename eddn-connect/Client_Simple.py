import zlib
import zmq
# import simplejson
import json
import sys
import time
from colorama import init, Fore, Back, Style
init()

"""
 "	Configuration
"""
__relayEDDN				= 'tcp://eddn.edcd.io:9500'
__timeoutEDDN			= 600000



"""
 "	Start
"""	   
def main():
	context		= zmq.Context()
	subscriber	= context.socket(zmq.SUB)
	
	subscriber.setsockopt(zmq.SUBSCRIBE, b"")
	subscriber.setsockopt(zmq.RCVTIMEO, __timeoutEDDN)

	while True:
		try:
			subscriber.connect(__relayEDDN)

			while True:
				__message	= subscriber.recv()

				if __message == False:
					subscriber.disconnect(__relayEDDN)
					break

				__message	= zlib.decompress(__message)
				__json = json.loads(__message)
				
				if("Factions" in __json["message"].keys()):
					ts = "[" + str(__json["header"]["gatewayTimestamp"]) + "]"
					ss = str(__json["message"]["StarSystem"])
					for f in __json["message"]["Factions"]:
						name_line = ts + " " + Fore.CYAN + ss + Style.RESET_ALL + " \"" + str(f["Name"]) + "\""
						if(f["Name"] == "Sirius Inc"):
							print("--------------------")
							print(name_line)
							print("    Allegiance: "   + str(f["Allegiance"]))
							print("    FactionState: " + str(f["FactionState"]))
							print("    Government: "   + str(f["Government"]))
							print("    Happiness: "    + str(f["Happiness"]))
							print("    Influence: "    + str(f["Influence"]))
							print("--------------------")
						else:
							print(Fore.GREEN + name_line)
				
				sys.stdout.flush()
				
		except zmq.ZMQError as e:
			print ('ZMQSocketException: ' + str(e))
			sys.stdout.flush()
			subscriber.disconnect(__relayEDDN)
			time.sleep(5)
			
		

if __name__ == '__main__':
	main()