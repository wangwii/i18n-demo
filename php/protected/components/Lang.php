<?php

class Lang extends CApplicationComponent
{
    public static function info($lang)
    {
        $lang = [
            'target' => $lang,
            'source' => Yii::app()->sourceLanguage,
            'messages' => Yii::app()->messages->getMessages(),
            'available_langs' => self::availableLangs(Yii::app()->sourceLanguage)
        ];
        return $lang;
    }

    private static function availableLangs($source)
    {
        $info = self::loadLangInfo();
        $languages = $info['languages'];
        $countries = $info['countries'];

        return array_reduce(Yii::app()->messages->getLanguages(), function ($ret, $lang) use($languages, $countries){
            array_push($ret, self::buildLangInfo($lang, $languages, $countries));
            return $ret;
        }, [self::buildLangInfo($source, $languages, $countries)]);
    }

    private static function loadLangInfo(){
        $path = dirname(__FILE__) . DIRECTORY_SEPARATOR . 'lang-info.json';
        if(file_exists($path)){
            return CJSON::decode(file_get_contents($path));
        }
        return ['languages' => [], 'countries' => []];
    }

    private static function buildLangInfo($lang, $languages, $countries){
        list($l, $c) = explode('_', $lang);
        return ['id' => $lang, 'language' => $languages[$l], 'country' => $countries[$c]];
    }
}