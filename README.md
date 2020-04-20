# myRetail Products Service
This repository is a POC for a Node/Express service that returns/modifies product data for the fictional company myRetail. 

Running the Service
-
1) Clone this repository using
    - SSH: `git clone git@github.com:morga549/myRetail.git`
    - HTTPS: `git clone https://github.com/morga549/myRetail.git`
    
2) Set required environment variables
    - NODE_ENV=dev
    - PORT=[port HTTP server will listen on]
    - DATABASE_URL=[Mongo database URL]
    - DATABASE_NAME=[Mongo database name]
    - MONGO_COLLECTION_NAME=[Mongo collection name]

3) Move to appropriate directory and start the app
    - `cd productAPI/ && node app.js`
    
NOTE: Service requires a MongoDB instance and expects pricing data with the following format

`{ "_id" : 13860428, "current_price" : { "value" : 18, "currency_code" : "USD" } }`


**Service API**
----

**GET /products**

Fetches product name from Redsky and pricing data from MongoDB instance.

* **URL**

    `http://localhost:<_port_>/products/<_id_>`
  
    Where <_id_> is the TCIN for the requested product and <_port_> is the port specified in PORT environment variable.

* **Method:**
  
  `GET` 
  
* **Success Response:**
  
  * **Code:** 200 <br />
  * **Content:** <br />
    ```
        {
           "current_price": {
               "value": 18,
               "currency_code": "USD"
           },
           "id": 13860428,
           "name": "The Big Lebowski (Blu-ray)"
       }
    ```
 
* **Error Responses:**

  * **Code:** 400 <br />
    **Content:** Invalid Parameters <br />
    **Reason:** If the parameters supplied including TCIN in URL or data in body are invalid
       
  * **Code:** 400 <br />
    **Content:** Missing Parameter <br />
    **Reason:** If a required parameter is not included in the request
  
  * **Code:** 404 <br />
    **Content:** Page Not Found <br />
    **Reason:** End point provided in request is incorrect OR product was not found in either Redsky or MongoDB product pricing data store.

  * **Code:** 415 <br />
    **Content:** Unsupported Media Type <br />
    **Reason:** URL included characters that failed to be decoded

* **Sample Call:**

    curl --location --request GET 'http://localhost:3000/products/13860428'
* **Notes:**
    - If data is not found for the requested product in either MongoDB or Redsky the call will return 404 Page Not Found. 
    
**PUT /products**

Modifies product pricing data in MongoDB
* **URL**

  `http://localhost:<_port_>/products/<_id_>`
  
  Where <_id_> is the TCIN for the requested product and <_port_> is the port specified in PORT environment variable.
* **Method:**

  `PUT` 
  
* **Data Params**

    Takes JSON body with following format
    ```
    {
    	"current_price": {
    		"value": 18.00,
    		"currency_code": "USD"
    	}
    }
    ```
  
* **Success Response:**

    Returns complete modified document from MongoDB.
  
  * **Code:** 201 <br />
  * **Content:** <br />
    ```
       {
           "current_price": {
               "value": 15.12,
               "currency_code": "USD"
           },
           "id": 13860428,
           "name": "The Big Lebowski (Blu-ray)"
       }
    ```
 
* **Error Responses:**

  * **Code:** 400 <br />
    **Content:** Invalid Parameters <br />
    **Reason:** If the parameters supplied including TCIN in URL or data in body are invalid
     
  * **Code:** 400 <br />
    **Content:** Missing Parameter <br />
    **Reason:** If a required parameter is not included in the request

  * **Code:** 404 <br />
    **Content:** Page Not Found <br />
    **Reason:** End point provided in request is incorrect.
    
  * **Code:** 409 <br />
    **Content:** Conflict <br />
    **Reason:** Product does not currently exist in MongoDB product pricing datastore
    
  * **Code:** 415 <br />
    **Content:** Unsupported Media Type <br />
    **Reason:** URL included characters that failed to be decoded

* **Sample Call:**

    `curl --location --request PUT 'http://localhost:3000/products/13860428'`
