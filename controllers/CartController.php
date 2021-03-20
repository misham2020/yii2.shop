<?php

namespace app\controllers;

use app\models\Cart;
use app\models\Product;
use Yii;
use yii\web\Session;

class CartController extends AppController{


    public function actionAdd($id){

        $product = Product::findOne($id);
      
        if(empty($product)){
            return false;

        }
        $session = \Yii::$app->session;
        $session->open();
        $cart = new Cart;
        $cart->addToCart($product);
            if(\Yii::$app->request->isAjax){
        return $this->renderPartial('cart-modal' , compact('session'));
    }
return $this->redirect(\Yii::$app->request->referrer);
}
public function actionShow(){
    $session = \Yii::$app->session;
    $session->open();
    return $this->renderPartial('cart-modal' , compact('session'));

}
public function actionDelItem(){

$id = \Yii::$app->request->get('id');
$session = \Yii::$app->session;
$session->open();
$cart = new Cart;
$cart->recalc($id);
return $this->renderPartial('cart-modal' , compact('session'));

}

public function actionClear(){
    $session = \Yii::$app->session;
    $session->open();
    unset ($_SESSION['cart']);
    unset ($_SESSION['cart.qty']);
    unset ($_SESSION['cart.sum']);
    return $this->renderPartial('cart-modal' , compact('session'));
}
}