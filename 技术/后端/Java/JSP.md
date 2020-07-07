# JSP

## 指令

1. 作用： 用于配置 JSP 页面，导入资源文件

2. 格式：
   <%@ 指令名称 属性名 1=属性值 1 属性名 2=属性值 2 %>

3. 分类

    1. page: 配置 JSP 页面

        - contentType: 等同于 response.setContentType()
        - import: 导包
        - errorPage: 当页面发生异常后，会自动跳转到指定的错误页面
        - isErrorPage： 标识当前是不是错误页面
            1. true: 是，可以使用内置对象 exception
            2. false: 否，默认值，不可以使用内置对象 exception

    2. include: 页面包含导入页面的资源文件

        - <%@ include filee="top.jsp" %>

    3. taglib : 导入资源

        - <%@ taglib prefix="c" uri="http://java.sum.com/jsp/jstl/core" %>

    4. prefix: 前缀，自定义

## 注释

1. html 注释

    - `<!-- -->`: 只能注释 html 代码片段

2. jsp 注释：推荐使用

    - `<%-- --%>`: 可以注释所有

## 内置对象

在 JSP 页面中不需要创建，直接使用的对象

| 变量名      | 真实类型           | 作用                        |
| ----------- | ------------------ | --------------------------- |
| pageContext | PageContext        | 当前页面的共享数据          |
| request     | HttpServletRequest | 一次请求访问的多个资源      |
| session     | HttpSession        | 一次会话的多个请求期间      |
| application | ServletContext     | 所有用户间共享数据          |
| response    | HttpServletReponse | 响应对象                    |
| page        | Object             | 当前页面(Servelet)对象 this |
| out         | JsWriter           | 输出对象，数据输出到页面上  |
| config      | ServletConfig      | Servlet 的配置对象          |
| exception   | Throwable          | 异常对象                    |

## EL 表达式

1.  概念: Express Language 表达式语言
2.  作用: 替换和简化 jsp 页面中 java 代码的编写
3.  语法: `${表达式}`
4.  注意: jsp 默认支持 el 表达式。如果要忽略 el 表达式

    1. 设置 jsp 中 page 指令中: `isElIgnore="true"` 忽略当前 jsp 页面中所有的 el 表达式

    2. `\${表达式}` : 忽略当前这个 el 表达式

5.  使用

    1.  运算符

        -   算数运算符: `+ - * /(div) %(mod)`
        -   比较运算符: `> < >= <= == !=`
        -   逻辑运算符: `&&(and) ||(or) !(not)`
        -   空运算符: `empty`
            1.  功能: 用于判断字符串、集合、数组对象是否为 null 或长度为 0
            2.  \${not empty str}: 判断字符串、集合、数组对象是否不为 null 或者长度 > 0

    2.  获取值

        -   el 表达式只能从与对象中获取值
        -   语法

            1. \${域名称.键名}: 从指定域中获取指定键的值

                - 域名称

                    - pagescope -> pageContext
                    - requestScope -> request
                    - sessionScope -> session
                    - applicationScope -> application(ServletContext)

                - 举例: 在 request 域中存储了 name-张

                - 获取 \${requestScope.name}

            2. \${键名}: 表示依次从最小的域中查找是否有该键对应的值，直到找到为止

            3. 获取对象，List，Map

                1. 对象: \${域名称.键名.属性名}
                    - 本质上会调用对象的 getter 方法
                2. List 集合: \${域名称.键名[索引]}
                3. Map 集合: \${域名称.键名.key 名称}
