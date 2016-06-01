<?php

class TodoForm extends CFormModel
{
	public $id;
	public $text;
	public $completed = false;

	public static function all()
	{
		$file = self::getFileName();

		if(!file_exists($file)){
			$todo = new TodoForm;
			$todo->id = 0;
			$todo->text = "Use Redux 好吗？";
			$todo->completed = false;
			$todo->saveToFile();

			return [$todo];
		}

		return json_decode(file_get_contents($file));
	}

	public function rules()
	{
		return array(
			// username and password are required
			array('id, text', 'required'),
			// rememberMe needs to be a boolean
			array('completed', 'boolean'),
		);
	}

	public function attributeLabels()
	{
		return array(
			'id'=>'Id', 'text' => 'Title', 'completed' => 'Completed'
		);
	}

	public function saveToFile(){
		$file = $this->getFileName();
		$todos = [];
		if(file_exists($file)){
			$todos = json_decode(file_get_contents($file));
		}

		array_push($todos, $this);
		return file_put_contents($file, json_encode($todos));
	}

	private static function getFileName(){
		$path = Yii::app()->getRuntimePath();
		$file = "${path}/todos.json";
		return $file;
	}
}
