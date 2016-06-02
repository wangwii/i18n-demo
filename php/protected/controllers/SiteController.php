<?php

class SiteController extends CController
{
	private static $USER_LANG_COOKIE_NAME = "_todos_user_lang";

	public $layout='//layouts/main';

	public function filters(){
		return [];
	}

	public function actionIndex()
	{
		$data = [
			'todos' => TodoForm::all(),
			'lang' => Lang::info($this->detectUserLang())
		];
		$this->render('index', ['data' => $data]);
	}

	public function actionError()
	{
		if($error=Yii::app()->errorHandler->error)
		{
			if(Yii::app()->request->isAjaxRequest)
				echo $error['message'];
			else
				$this->render('error', $error);
		}
	}

	private function detectUserLang(){
		# TODO: Check query string and cookie for user favorite lang
		return Yii::app()->request->preferredLanguage;
	}
}
