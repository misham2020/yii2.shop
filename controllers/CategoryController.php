<?php

namespace app\controllers;

use app\models\Category;
use app\models\Product;
use yii\web\NotFoundHttpException;

class CategoryController extends AppController{


    public function actionView($id){

        
         $category = Category::findOne($id);

         If(!$category){
            throw new NotFoundHttpException('такой категории нет');
         }
         $products = Product::find()->where(['category_id' => $id])->all();

        return $this->render('veiw' , compact('category', 'products'));
}


}