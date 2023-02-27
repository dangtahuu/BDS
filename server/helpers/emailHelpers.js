const nodemailer = require('nodemailer');

//Send email confirm register user
exports.sendEmailRegisterUser = async (email, userName) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'dangtahuu@gmail.com',
            pass: 'rfrcowkmloleoctn'
        }
    });

    var mainOptions = {
        from: 'dangtahuu@gmail.com',
        to: email,
        subject: 'Xác nhận đăng ký tài khoản',
        text: `Bạn đã đăng ký tài khoản thành công trên hệ thống với email là: ${email}`,
        html:
            `<html>
                <head>
                    <style>
                        .wrapper {
                            width: 100%;
                            min-width: 580px;
                            background-color: #FAFAFA;
                            padding: 10px 0;
                        }
                
                        .info {
                            list-style-type: none;
                        }
                
                        @media screen and (max-width: 600px) {
                            .form {
                                border: solid 1px #dddddd;
                                padding: 50px 30px;
                                border-radius: 3px;
                                margin: 0px 5%;
                                background-color: #FFFFFF;
                            }
                        }
                
                        .form {
                            border: solid 1px #dddddd;
                            padding: 50px 30px;
                            border-radius: 3px;
                            margin: 0px 25%;
                            background-color: #FFFFFF;
                        }
                
                        .title {
                            text-align: center;
                        }
                
                        .footer {
                            margin: 0px 25%;
                            text-align: center;
                
                        }
                    </style>
                </head>
                
                <body>
                    <div className="wrapper">
                        <div className="title">
                            <h1>Bất động sản TĐ</h1>
                        </div>
                        <div className="form">
                            <p><b>Chào ${userName}, tài khoản đăng nhập của bạn là: </b></p>
                            <div className="info">
                                <li>Tài khoản: ${email}</li>
                            </div>
                            <div className="info">
                                <li>Đăng nhập ngay tại: <a href="/">/</a></li><br /><br />
                            </div>

                            <p><b>Hi ${userName}, your account information: </b></p>
                            <div className="info">
                                <li>Account: ${email}</li>
                            </div>
                            <div className="info">
                                <li>Login in: <a href="/">/</a></li>
                            </div>
                            </div>
                        <div className="footer">
                            <p>Bản quyền thuộc về
                                <i>Công ty Bất Động Sản TĐ</i>
                            </p>
                        </div>
                    </div>
                </body>
            </html>`
    }

    return await transporter.sendMail(mainOptions);
}

//Send email confirm register user
exports.sendEmailActived = async (email, userName) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'dangtahuu@gmail.com',
            pass: 'rfrcowkmloleoctn'
        }
    });

    var mainOptions = {
        from: 'dangtahuu@gmail.com',
        to: email,
        subject: 'Thông báo kích hoạt tài khoản',
        text: `Tài khoản của bạn đã được kích hoạt trên hệ thống trên hệ thống với email là: ${email}`,
        html:
            `<html>
                <head>
                    <style>
                        .wrapper {
                            width: 100%;
                            min-width: 580px;
                            background-color: #FAFAFA;
                            padding: 10px 0;
                        }
                
                        .info {
                            list-style-type: none;
                        }
                
                        @media screen and (max-width: 600px) {
                            .form {
                                border: solid 1px #dddddd;
                                padding: 50px 30px;
                                border-radius: 3px;
                                margin: 0px 5%;
                                background-color: #FFFFFF;
                            }
                        }
                
                        .form {
                            border: solid 1px #dddddd;
                            padding: 50px 30px;
                            border-radius: 3px;
                            margin: 0px 25%;
                            background-color: #FFFFFF;
                        }
                
                        .title {
                            text-align: center;
                        }
                
                        .footer {
                            margin: 0px 25%;
                            text-align: center;
                
                        }
                    </style>
                </head>
                
                <body>
                    <div className="wrapper">
                        <div className="title">
                            <h1>Bất động sản TĐ</h1>
                        </div>
                        <div className="form">
                            <p><b>Chào ${userName}, tài khoản của bạn đã được kích hoạt, vui lòng đăng nhập lại vào hệ thống: </b></p>
                            <div className="info">
                                <li>Tài khoản: ${email}</li>
                            </div>
                            <div className="info">
                                <li>Đăng nhập ngay tại: <a href="${process.env.WEBSITE}">${process.env.WEBSITE}</a></li><br /><br />
                            </div>

                            <p><b>Hi ${userName}, your account information: </b></p>
                            <div className="info">
                                <li>Account: ${email}</li>
                            </div>
                            <div className="info">
                                <li>Login in: <a href="${process.env.WEBSITE}">${process.env.WEBSITE}</a></li>
                            </div>
                            </div>
                        <div className="footer">
                            <p>Bản quyền thuộc về
                                <i>Công ty Bất Động Sản TĐ</i>
                            </p>
                        </div>
                    </div>
                </body>
            </html>`
    }

    return await transporter.sendMail(mainOptions);
}