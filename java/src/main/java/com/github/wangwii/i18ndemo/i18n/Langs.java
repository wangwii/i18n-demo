package com.github.wangwii.i18ndemo.i18n;

import com.google.gson.annotations.SerializedName;

import java.util.*;

public class Langs {
    static class LangInfo {
        String id;
        String language;
        String country;

        public LangInfo(String id, String language, String country) {
            this.id = id;
            this.language = language;
            this.country = country;
        }
    }

    //current language
    private String target;

    //default language
    private final String source = "en_au";

    private Properties messages;

    @SerializedName("available_langs")
    private List<LangInfo> availableLangs;

    public Langs(Locale locale) {
        this.target = getLangID(locale);
        availableLangs = getAvailableLangs();
        this.messages = loadMessages();
    }

    private Properties loadMessages() {
        Locale[] locales = new Locale[]{Locale.SIMPLIFIED_CHINESE, new Locale("en", "AU")};
        //TODO: auto detect which languages be support

        Properties props = new Properties();
        for (Locale locale : locales) {
            props.put(getLangID(locale), loadMessage(locale));
        }
        return props;
    }

    private Properties loadMessage(Locale locale) {
        ResourceBundle bundle = ResourceBundle.getBundle("messages", locale);
        Properties props = new Properties();
        for (String name : Collections.list(bundle.getKeys())) {
            props.put(name, bundle.getString(name));
        }
        return props;
    }

    private List<LangInfo> getAvailableLangs() {
        //TODO: auto detect the available languages

        ArrayList<LangInfo> langInfos = new ArrayList<>();
        langInfos.add(new LangInfo("en_au", "en_language_name", "au_country_name"));
        langInfos.add(new LangInfo("zh_cn", "zh_language_name", "cn_country_name"));

        return langInfos;
    }

    private String getLangID(Locale locale) {
        return String.format("%s_%s", locale.getLanguage(), locale.getCountry()).toLowerCase();
    }

    public static void main(String[] args) {
        Langs obj = new Langs(Locale.SIMPLIFIED_CHINESE);

        java.util.HashMap<String, Object> data = new HashMap<>();
        data.put("lang", obj);
        data.put("todos", new Integer[]{1, 2, 3, 4, 5, 6});
        //Gson GSON = new GsonBuilder().create();
        //System.out.println(GSON.toJson(data));

        System.out.println(Locale.SIMPLIFIED_CHINESE.getLanguage());
        System.out.println(Locale.SIMPLIFIED_CHINESE.getCountry());
        Properties props = obj.loadMessages();
        System.out.println(props);
    }
}
