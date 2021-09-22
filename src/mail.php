<?php
$name = trim($_POST['name']);
$email = trim($_POST['email']);
$phone = trim($_POST['tel']);
// $message = trim($_POST['message']);

// указываем адрес отправителя, можно указать адрес на домене Вашего сайта
$fromMail = 'admin@aquacare.ru';
$fromName = 'aquacare.ru Форма';

// Сюда введите Ваш email
$emailTo = 'fileer@rambler.ru';
$subject = 'Форма обратной связи';
$subject = '=?utf-8?b?'. base64_encode($subject) .'?=';
$headers = "Content-type: text/plain; charset=\"utf-8\"\r\n";
$headers .= "From: ". $fromName ." <". $fromMail ."> \r\n";

// тело письма
$body = "Получено письмо с сайта aquacare.ru \n Имя: $name\nТелефон: $phone \n E-mail: $email\nСообщение: $message";

// сообщение будет отправлено в случае, если поле с номером телефона не пустое
if (strlen($phone) > 0) {
    $mail = mail($emailTo, $subject, $body, $headers, '-f'. $fromMail );
}

?>