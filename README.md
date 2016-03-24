# Easy-Key-Z
[Running Demo](http://52.37.97.92:8080/#/keypairGeneration)
1. What is it?
    * Easy-Key-Z is a web-based tool meant to allow those who need to do basic certificate management tasks, but do not feel comfortable using CLI-based tools such as OpenSSL. 

2. What can I do with Easy-Key-Z?
    * Generate RSA keypairs.
    * Generate CSR's using the aforementioned keypairs.
    * Enter CA-signed certificates into specified trust stores (at the moment, the plan is to support Java Key Stores).

3. What are the dependencies?
    * AngularJS
    * Bootstrap
    * Python (Flask & PyOpenSSL)