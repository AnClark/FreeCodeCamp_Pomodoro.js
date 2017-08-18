var second=10;
var timer;
function change()
{
    second--;

    if(second>-1)
    {
        console.log(second);
        timer = setTimeout(change, 1000);//调用自身实现
    }
    else
    {
        clearTimeout(timer);
    }
}
timer = setTimeout(change, 1000);