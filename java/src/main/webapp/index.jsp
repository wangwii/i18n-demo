<%@ page import="com.github.wangwii.i18ndemo.i18n.Langs" %>
<%@ page import="com.github.wangwii.i18ndemo.domain.Todo" %>
<%@ page import="java.util.List" %>
<%@ page import="java.util.HashMap" %>
<%@ page import="com.google.gson.GsonBuilder" %>
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>i18n - Java/JAX-RS</title>
</head>
<body>
<div id="root"></div>
<script type="text/javascript">
  var WebFontConfig = { google: { families: [ 'Roboto:400,300,500:latin' ] }};
  (function() {
    var wf = document.createElement('script');
    wf.src = '//ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
</script>
<script type="text/javascript">
<%
  Langs lang = new Langs(request.getLocale());
  List<Todo> todos = Todo.list();
  java.util.Map<String, Object> data = new HashMap<>();
  data.put("lang", lang);
  data.put("todos", todos);
  String json = new GsonBuilder().create().toJson(data);
%>
window.INIT_DATA = <%=json%>;
</script>
<script src="static/vendor.bundle.js"></script>
<script src="static/bundle.js"></script>
</body>
</html>
