
const pasteHTML = (link: string, email: string) => (`
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
            <h1 class="header">Welcome to</h1>

            <center>
              <img src="https://i.ibb.co/GtC0QDF/logosmall.png" />
            </center> 
          </div>

          <main class="main mt">
              <p class="content">
                Thank you for signing up at <b>Toolhance</b>. To finalize your
                registration, please verify your email address <i>(${email})</i> by clicking the
                <b>button</b> below:
              </p>

              <center>
                <button class="button">
                  <a href=${link}>Verify Email</a>
                </button>
              </center>

              <hr class="mt" />
              <p class="content gray mt">
                If you didn't sign up for an account, please ignore this email.
              </p>
          </main>
        </div>
    </body>
  </html>
`)

export default pasteHTML