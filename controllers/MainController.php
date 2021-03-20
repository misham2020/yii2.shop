<?php

namespace app\controllers;

use app\models\Product;

class MainController extends AppController{


    public function actionIndex(){

        $isOffer= Product::find()->where(['is_offer' => 1])->limit(4)->all();

        return $this->render('index', compact('isOffer'));
}


}