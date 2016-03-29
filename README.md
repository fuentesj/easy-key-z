# Easy-Key-Z
[Running Demo](http://52.37.97.92:8080/#/keypairGeneration)

1. What is it?
    * Easy-Key-Z is a web-based tool meant to allow those who need to do basic certificate management tasks, but do not feel comfortable using CLI-based tools such as openssl or keytool. 

2. What's wrong with CLI-based tools?
	* Nothing really, however some people simply are not as comfortable using a terminal window to execute commands. This may be especially true if, for example, someone with less experience with certificates is asked to generate keypairs for a production environment. A tool like Easy-Key-Z makes such tasks easier.

3. What can I do with Easy-Key-Z?
	* There are plans to support the following features in the first version:
    	* Generate RSA keypairs.
    	* Generate CSR's using the aforementioned keypairs.
    	* Enter CA-signed certificates into specified trust stores (at the moment, the plan is to support Java Key Stores).

4. How can I deploy it?
	* Ensure your target host is running Ubuntu (any major Linux distribution will likely work, but I've only used Ubuntu). If you are using another OS, then be sure to update the Ansible playbook (e.g. user).
	* Clone or fork this repository.
	* Install Ansible on your development machine, and configure it so your target host is in your Ansible inventory.
	* Open a terminal window, cd into the server directory, and use the following command to deploy Easy-Key-Z to your host:
		* ```$ ansible-playbook deployment.yaml```	

4. What are the dependencies?
    * AngularJS
    * Bootstrap
    * Python (Flask & PyOpenSSL)