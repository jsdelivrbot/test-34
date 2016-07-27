import moment from 'moment';

export class DateFormatValueConverter {
    toView(value, format) {
        if(format){
            return moment(value).format(format);
        }else{
            return moment(value).format('M/D/YYYY');
        }
    }
}
