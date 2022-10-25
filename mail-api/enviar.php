<?php
    header('Access-Control-Allow-Origin: *');
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
    header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
    
    $datosJSON = file_get_contents("php://input");
    $datos = json_decode($datosJSON);
    $respuesta;

    //Creamos el mail con la consulta y lo enviamos
    $nombre = $datos->name;
    $remitente = $datos->email;
    $servicio = $datos->servicio;
    $mensaje = $datos->consulta;
    $headers = "From: " . $datos->email;

    $mail = mail(
        'javierhmunizaga@gmail.com',
        $servicio,
        $mensaje,
        $headers
    );

    //Creamos un mail de agradecimiento por la consulta y lo enviamos
    
    //Cuerpo del mensaje
    ob_start();
    include "gracias.php";
    $mensaje_agradecimiento = ob_get_contents();
    ob_end_clean();

    //armamos el header del mail de agradecimiento
    $headers_agradecimiento = 'MIME-Version: 1.0' . "\r\n";
    $headers_agradecimiento .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";   
    $headers_agradecimiento .= 'From: javierhmunizaga@gmail.com' . "\r\n"; 

    //enviamos el mail
    $mail_agradecimiento = mail(
        $remitente,
        'Muchas gracias por su consulta',
        $mensaje_agradecimiento,
        $headers_agradecimiento
    );

    //compramos que el mail se haya enviado adecuadamente
    if($mail){
        $respuesta = array('mensaje' => 'Tu mail se envio con éxito');
    }else{
        $respuesta = array('mensaje' => 'Ocurrio un problema y no pudismo enviar tu consulta');
    }
    print_r(json_encode($respuesta));
?>