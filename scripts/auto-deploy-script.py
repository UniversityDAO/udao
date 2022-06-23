import os
import time


#ensure node is running before running
#also ensure to npm install to get dependencies
hh_compile = "npx hardhat compile"
token_deployment = "npx hardhat run deployment-script.js --network localhost"
governance_deployment = "npx hardhat run governance-deployment.js --network localhost"
setup_script = "npx hardhat run setup-scripts.js --network localhost"

setup_steps = [hh_compile, token_deployment, governance_deployment, setup_script]

def run(steps):
	while len(steps) > 0:
		os.system(steps[0])
		time.sleep(1)
		steps.pop(0)
		run(steps)
		
run(setup_steps)



