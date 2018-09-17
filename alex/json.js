var person = new Object();
person.name = 'chy';
person.age = 24;
person.city= ['FuZhou', 'XiaMen'];
var replacerArr = [ 'name', 'city', 'unknown' ];
var space = '-*-';

console.log(JSON.stringify(person));
//输出 '{"name":"city","age":24,"city":["FuZhou","XiaMen"]}'
JSON.stringify(person, replacerArr);
//输出 '{"name":"chy","city":["FuZhou","XiaMen"]}'
JSON.stringify(person, function(key, value) {
    console.log("key = " + key);
    return value.toString().toUpperCase();
});
