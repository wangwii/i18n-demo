package com.github.wangwii.i18ndemo.domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class Todo {
    public int id;
    public String text;
    public Date createdAt;
    public boolean completed = false;

    public Todo(int id, String text) {
        this.id = id;
        this.text = text;
        this.createdAt = new Date();
    }

    public static List<Todo> list() {
        List<Todo> list = new ArrayList<>();
        list.add(new Todo(1, "Use Redux"));
        return list;
    }
}
