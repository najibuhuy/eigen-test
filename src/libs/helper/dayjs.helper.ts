import * as dayjs from 'dayjs';
import * as isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import * as isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import * as isBetween from 'dayjs/plugin/isBetween';
import * as customParseFormat  from 'dayjs/plugin/customParseFormat'

import 'dayjs/locale/id';

// use plugin
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)
dayjs.extend(isBetween)
dayjs.extend(customParseFormat)


// use locale
dayjs.locale('id');

export const isSameOrBeforeDate = (start: string, finish: string) => {
    //isSameOrBeforeDate('2023-01-02', '2023-01-03') //false
    return dayjs(finish).isSameOrBefore(start, 'h')
}

export const isSameOrAfterDate = (start: string, finish: string) => {
    return dayjs(finish).isSameOrAfter(start, 'h')
}

export const dateNow = () => {
    return new Date();
}

export const dateNowDayjs = () => {
    return dayjs().add(8,'h').format()
}

export const newDate = (date:string) => {
    return dayjs(date).add(8, 'h').format()
}

export const newDateString = (date:Date) => {
    return dayjs(date).format()
}

export const addTime = (date: string, minutes: number, format:substractTimeType) => {
    return dayjs(date).add(minutes, format).format()
}

export const addDate = (date: string, num: number, format:substractDateType) => {
    return dayjs(date).add(num, format).format()
}


export enum substractTimeType {
    SECOND = 's',
    MINUTES = 'm',
    HOUR = 'h',
}

export enum substractDateType {
    DAY = 'd',
    WEEK = 'w',
    MONTH = 'M',
    YEAR = 'y',
}

export const substractTime = (date: string, num: number, format:substractTimeType ) => {
    return dayjs(date).add(num, format).format()
}

export const isBetweenDayjs = (startDate: string, endDate: string, betweenDate : string) => {
    return dayjs(betweenDate).isBetween(startDate, endDate, 'day', '[)')
}

export const isAfterDate = (startDate: string, endDate :string) => {
    return dayjs(startDate).isAfter(dayjs(endDate))
}

export const differentMonth= (startDate: string, endDate: string) => {
    const startDateDayjs = dayjs(endDate)
    const sendDateDayjs = dayjs(startDate)
    return startDateDayjs.diff(sendDateDayjs, 'month')
}

export const differentYear= (startDate: string, endDate: string) => {
    const startDateDayjs = dayjs(endDate)
    const sendDateDayjs = dayjs(startDate)
    return startDateDayjs.diff(sendDateDayjs, 'year')
}

export const differentDay= (startDate: string, endDate: string) => {
    const startDateDayjs = dayjs(endDate)
    const sendDateDayjs = dayjs(startDate)
    return startDateDayjs.diff(sendDateDayjs, 'day')
}

export const differentWeek= (startDate: string, endDate: string) => {
    const startDateDayjs = dayjs(endDate)
    const sendDateDayjs = dayjs(startDate)
    return startDateDayjs.diff(sendDateDayjs, 'week')
}