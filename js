// 存放历史记录的数组
var historyArray = []


// 向输入框中插入数字
function insert_num(num){
    document.form.show.value += num
    return document.form.show.value
}
// 向输入框中插入运算符
function insert_op(op){
    var t = document.form.show.value
    var l = t.length
    // 如果最后一个字符是运算符，替换掉
    if(t[l-1]<'0'||t[l]>'9'){

        document.form.show.value = t.substring(0,t.l-1)
    }
    document.form.show.value += op
}
// 在输入框中显示结果
function display(op){
    var t = document.form.show.value
    t+=op
    document.form.show.value=t
}
// 计算表达式
function equal(){
    try{
        var exp = document.form.show.value
    if(exp){
        document.form.show.value = eval(exp)
        // 如果结果为无穷大，显示错误信息
        if(eval(exp)=="Infinity")
        {
            document.form.show.value="error";
        }
        // 发送历史记录到服务器
        var result=eval(exp)
        var xhr= new XMLHttpRequest
        xhr.open('POST','http://127.0.0.1:5000/get_history',true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status === 200) {
                console.log(xhr.responseText);
            }
        };
        const data = {
            expression: exp,
            result: result
            };
            xhr.send(JSON.stringify(data));
    }
    }
    catch{
        document.form.show.value = "error"
    }
}
function clean(){
    document.form.show.value = ""
}
function sin(){
    equal()
    var jiao = document.form.show.value
    var view =  Math.sin(jiao/180*Math.PI)
    view =view.toFixed(2)
    clean()
    document.form.show.value += view
}
function cos(){
    equal()
    var jiao = document.form.show.value
    var view =  Math.cos(jiao/180*Math.PI)
    view =view.toFixed(2)
    clean()
    document.form.show.value += view
}
function tan(){
    equal()
    var jiao = document.form.show.value
    var view =  Math.tan(jiao/180*Math.PI)
    view =view.toFixed(2)
    clean()
    document.form.show.value += view
}
function ln(){
    equal()
    document.form.show.value = Math.log10(document.form.show.value)
}
function back(){
    var t = document.form.show.value
    l = t.length
    document.form.show.value = t.substring(0,l-1)
}
function sqrt(){
    equal()
    document.form.show.value = Math.sqrt(document.form.show.value)
}
function factorial(n) {
    let result = 1
    for(let i = 1; i <= n; i++) {
        result *= i
    }
    return result
}
function jiecheng(){
    equal()
    document.form.show.value = factorial(document.form.show.value)
}
function calculate(str){
    if(str>='0'&&str<='9') insert_num(str)
    if(str=='+'||str=='*'||str=='/'||str=='-'||str=='.'||str=='%') insert_op(str)
    if(str=='sin') sin()
    if(str=='cos') cos()
    if(str=='tan') tan()
    if(str=='ln') ln()
    if(str=='x!') jiecheng()
    if(str=='=')  equal()
    if(str=='AC') clean()
    if(str=='sqrt') sqrt()
    if(str=='BACK') back()
    return document.form.show.value
}

// 从服务器获取历史记录
function gethistory(){
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:5000/get_calculation', true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
            Data = JSON.parse(xhr.responseText);
            historyArray = Data['data'];
            let str="";
            for(let i=0;i<array.length;i++){
                str +=array[i][0]+" = "+array[i][1]+"\n";
            }
            document.form.show.value=str
        }
      }
    };
    xhr.send();
 }
