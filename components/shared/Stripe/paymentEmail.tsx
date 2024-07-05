const pasteHTML = (link: string) => (`
  <!DOCTYPE html>
  <html lang="en">
     <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Email Verification</title>
        <style>
           body {
              font-family: Arial, Helvetica, sans-serif;
              margin: 0;
              padding: 20px;
              background-color: #f5f5f5;
           }
  
           .container {
              max-width: 600px;
              margin: 0 auto;
              background-color: #fff;
              border-radius: 12px;
           }
  
           .blue {
              background-color: aliceblue;
              padding-block: 32px;
              border-radius: 12px;
           }
  
           .main {
              padding: 32px;
            }
  
           .header {
              text-align: center;
              margin-bottom: 0;
              font-size: 24px;
              font-weight: bold; 
              padding-top: 32px; 
           }
  
           .content {
              line-height: 1.5;
              font-size: 16px;
              text-align: center;
           }
  
           .button {
              padding: 12px;
              background-color: transparent;
              transition: 200ms;
              border-radius: 12px;
              cursor: pointer;
              border: 2px solid #00a6ff;
           }
  
           .button:hover {
            background-color: aliceblue;
          }
  
           button a {
              color: white;
              text-decoration: none;
              font-weight: bold;
              font-size: 16px;
           }
  
           .gray {
              color: gray;
           }
  
           .mt {
              margin-top: 64px;
           }
  
           img {
            margin-bottom: 32px;
           }
  
           .truncated-link {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        </style>
     </head>
  
     <body>
        <div class="container">
           <div class="blue">
              <h1 class="header">Enjoy your premium account at</h1>
  
              <center>
                <img src="https://i.ibb.co/GtC0QDF/logosmall.png" />
              </center> 
            </div>
  
            <main class="main mt">
                <p class="content">
                  Thank you for upgrading your account to Premium.<br />
                  You may now head back to Toolhance to enjoy your premium features by clicking the <b>button</b> below:
                </p>
  
                <center>
                  <button class="button">
                    <a href=${link}>Explore Toolhance Premium</a>
                  </button>
                </center>
  
                <hr class="mt" />
                <p class="content gray mt">
                  To cancel the subscription, please contact support@toolhance.com!
                </p>
            </main>
          </div>
      </body>
    </html>
  `)
  
  export default pasteHTML