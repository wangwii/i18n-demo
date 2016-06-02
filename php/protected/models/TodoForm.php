<?php

class TodoForm extends CFormModel
{
	public $id;
	public $text;
	public $createdAt;
	public $completed = false;

	public function __construct($scenario)
	{
		parent::__construct($scenario);
		$this->createdAt = date_create();
	}

	public static function all()
	{
		$file = self::getFileName();

		if(!file_exists($file)){
			$todo = new TodoForm('');
			$todo->id = time();
			$todo->text = "Use Redux 好吗？";
			$todo->saveToFile();

			return [$todo->getAttributes()];
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
			'id'=>'Id', 'text' => 'Title', 'completed' => 'Completed', 'createdAt' => 'CreatedAt'
		);
	}

	public function saveToFile(){
		$file = $this->getFileName();
		$todos = [];
		if(file_exists($file)){
			$todos = json_decode(file_get_contents($file));
		}

		array_push($todos, $this->getAttributes());
		return file_put_contents($file, json_encode($todos));
	}

	private static function getFileName(){
		$path = Yii::app()->getRuntimePath();
		$file = "${path}/todos.json";
		return $file;
	}
}
