<?php

class CJsonMessageSource extends CMessageSource
{
    const CACHE_KEY_PREFIX = 'Yii.CJsonMessageSource.';

    public $cachingDuration = 0;
    public $cacheID = 'cache';
    public $basePath;
    public $extensionPaths = array();

    private $_files = array();

    public function init()
    {
        parent::init();
        if ($this->basePath === null)
            $this->basePath = Yii::getPathOfAlias('application.messages');
    }

    public function getCategories($language)
    {
        $langDir = $this->basePath . DIRECTORY_SEPARATOR . $language;
        if (!is_dir($langDir)) {
            return [];
        }

        $cates = array_filter(scandir($langDir), function ($file) {
            return $file != '.' && $file != '..';
        });

        return array_map(function ($file) {
            return basename($file, '.json');
        }, $cates);
    }

    public function getLanguages()
    {
        return array_filter(scandir($this->basePath), function ($file) {
            return $file != '.' && $file != '..';
        });
    }

    public function getMessages()
    {
        return array_reduce($this->getLanguages(), function ($ret, $lang) {
            $ret[$lang] = array_reduce($this->getCategories($lang), function ($ret, $cate) use($lang){
                $ret[$cate] = $this->loadMessages($cate, $lang);
                return $ret;
            }, []);
            return $ret;
        }, []);
    }

    protected function getMessageFile($category, $language)
    {
        if (!isset($this->_files[$category][$language])) {
            if (($pos = strpos($category, '.')) !== false) {
                $extensionClass = substr($category, 0, $pos);
                $extensionCategory = substr($category, $pos + 1);
                // First check if there's an extension registered for this class.
                if (isset($this->extensionPaths[$extensionClass]))
                    $this->_files[$category][$language] = Yii::getPathOfAlias($this->extensionPaths[$extensionClass]) . DIRECTORY_SEPARATOR . $language . DIRECTORY_SEPARATOR . $extensionCategory . '.json';
                else {
                    // No extension registered, need to find it.
                    $class = new ReflectionClass($extensionClass);
                    $this->_files[$category][$language] = dirname($class->getFileName()) . DIRECTORY_SEPARATOR . 'messages' . DIRECTORY_SEPARATOR . $language . DIRECTORY_SEPARATOR . $extensionCategory . '.json';
                }
            } else
                $this->_files[$category][$language] = $this->basePath . DIRECTORY_SEPARATOR . $language . DIRECTORY_SEPARATOR . $category . '.json';
        }
        return $this->_files[$category][$language];
    }

    protected function loadMessages($category, $language)
    {
        $messageFile = $this->getMessageFile($category, $language);

        if ($this->cachingDuration > 0 && $this->cacheID !== false && ($cache = Yii::app()->getComponent($this->cacheID)) !== null) {
            $key = self::CACHE_KEY_PREFIX . $messageFile;
            if (($data = $cache->get($key)) !== false)
                return unserialize($data);
        }

        if (is_file($messageFile)) {
            $messages = CJSON::decode(file_get_contents($messageFile));
            if (!is_array($messages))
                $messages = array();
            if (isset($cache)) {
                $dependency = new CFileCacheDependency($messageFile);
                $cache->set($key, serialize($messages), $this->cachingDuration, $dependency);
            }
            return $messages;
        } else
            return array();
    }
}