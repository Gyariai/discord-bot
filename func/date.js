module.exports.isDate = (data, user_date) => {
    const date = convertIDtoUnix(user_date) // дата регистрации
    const split = data.split(".")

    const dt = new Date(split[2], Number(split[1]) - 1, split[0]).getTime() // дата проверки

    if(date < dt) { return true } else { return false }
}

function convertIDtoUnix(id) {
	/* Note: id has to be str */
	var bin = (+id).toString(2);
	var unixbin = '';
	var unix = '';
	var m = 64 - bin.length;
	unixbin = bin.substring(0, 42-m);
	unix = parseInt(unixbin, 2) + 1420070400000;
	return unix;
}