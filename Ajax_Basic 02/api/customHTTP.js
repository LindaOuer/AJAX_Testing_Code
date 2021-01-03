export class customHTTP {
    constructor() {
        this.http = new XMLHttpRequest()
    }

    //GET Request

    get = (url, callback) => {
        this.http.open('GET', url, true)
        this.http.send()
        this.http.onload = () => {
            if (this.http.status === 200) {
                let data = this.http.responseText
                let employees = JSON.parse(data)
                callback(null, employees)
            }
            else {
                callback(`Error: ${this.http.status}`)
            }
        }
    }

    // POST Request

    post = (url, employee, callback) => {
        this.http.open('POST', url, true)

        this.http.setRequestHeader('Content-Type', 'application/json')

        this.http.send(JSON.stringify(employee))

        this.http.onload = () => {
            if (this.http.status === 200) {
                let data = this.http.responseText
                
                let employees = JSON.parse(data)


                callback(null, employees)
            } else {
                callback(`Error: ${this.http.status}`)
            }
        }
    }

    // PUT Request 

    put = (url, employee, callback) => {
        this.http.open('PUT', url, true)

        this.http.setRequestHeader('Content-Type', 'application/json')

        this.http.send(JSON.stringify(employee))

        this.http.onload = () => {
            if (this.http.status === 200) {
                let data = this.http.responseText
                
                let employees = JSON.parse(data)


                callback(null, employees)
            } else {
                callback(`Error: ${this.http.status}`)
            }
        }
    }

    // DELETE Request 

    delete = (url, callback) => {
        this.http.open('DELETE', url, true)
        
        this.http.setRequestHeader('Content-Type', 'application/json')

        this.http.send()
        
        this.http.onload = () => {
            alert(this.http.status)
            if (this.http.status === 200) {
                let data = this.http.responseText
                // console.log(data)
                let employees = JSON.parse(data)

                callback(null, employees)
            } else {
                callback(`Error: ${this.http.status}`)
            }
        }
    }
}