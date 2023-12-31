import React from 'react'
import Script from 'next/script'

const Head: React.FC = () => {
    return (
        <>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1"
            crossOrigin="anonymous"
            />  
        </>
    )
}

export default Head