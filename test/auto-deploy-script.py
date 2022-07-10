import os
import time

#deployment order matters in hardhat, ensure the order in set_steps mathches addresses in scripts
#ensure node is running before running
#also ensure to npm install to get dependencies
hh_compile = "npx hardhat compile"
ERC721_deployment = "npx hardhat run ../scripts/membershipNFT-deployment-script.js --network localhost"
ERC20_deployment = "npx hardhat run ../scripts/ERC20-deployment-script.js --network localhost"
governance_deployment = 'npx hardhat run ../scripts/governance-deployment-script.js --network localhost'
#setup_script = "npx hardhat run setup-script.js --network localhost"

setup_steps = [hh_compile, ERC721_deployment, ERC20_deployment, governance_deployment]

def run(steps):
	while len(steps) > 0:
		os.system(steps[0])
		time.sleep(1)
		steps.pop(0)
		run(steps)
		
run(setup_steps)

