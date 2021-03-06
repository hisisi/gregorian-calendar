/**
 * tests for gregorian gregorianCalendar
 * @author yiminghe@gmail.com
 */

const GregorianCalendar = require('../../');
const ONE_SECOND = 1000;
const ONE_MINUTE = 60 * ONE_SECOND;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const expect = require('expect.js');
// const ONE_WEEK = 7 * ONE_DAY;

const Utils = GregorianCalendar.Utils;

const day1 = new Date(1, 0, 1);
day1.setFullYear(1);

function getDiffByDays(day2) {
  return parseInt((day2.getTime() - day1.getTime()) / ONE_DAY, 10) + 1;
}

describe('GregorianCalendar Utils', () => {
  it('mod works', () => {
    expect(Utils.mod(8, 7)).to.be(1);
    expect(Utils.mod(7, 7)).to.be(0);
    expect(Utils.mod(-8, 7)).to.be(6);
    expect(Utils.mod(-7, 7)).to.be(0);
  });

  it('getFixedDate works', () => {
    let d = new Date(2013, 0, 3, 0, 0, 0, 0);
    expect(getDiffByDays(d)).to.be(734869 + 2);

    d = new Date(2013, 0, 1, 0, 0, 0, 0);
    expect(getDiffByDays(d)).to.be(734869);
    expect(getDiffByDays(d)).to.be(Utils.getFixedDate(2013, 0, 1));

    d = new Date(3013, 4, 3, 0, 0, 0, 0);
    // ipad is diff by 1....
    expect(getDiffByDays(d) - (Utils.getFixedDate(3013, 4, 3))).to.be.within(-5, 5);


    d = new Date(-3013, 4, 3, 0, 0, 0, 0);
    expect(getDiffByDays(d)).to.be(Utils.getFixedDate(-3013, 4, 3));
  });

  it('getGregorianDateFromFixedDate works', () => {
    let d = new Date(2013, 0, 3, 0, 0, 0, 0);
    let d2 = Utils.getGregorianDateFromFixedDate(Utils.getFixedDate(2013, 0, 3));
    expect(d2.year).to.be(d.getFullYear());
    expect(d2.month).to.be(d.getMonth());
    expect(d2.dayOfMonth).to.be(d.getDate());
    expect(d2.dayOfWeek).to.be(d.getDay());

    d = new Date(2013, 0, 1, 0, 0, 0, 0);
    d2 = Utils.getGregorianDateFromFixedDate(Utils.getFixedDate(2013, 0, 1));
    expect(d2.year).to.be(d.getFullYear());
    expect(d2.month).to.be(d.getMonth());
    expect(d2.dayOfMonth).to.be(d.getDate());
    expect(d2.dayOfWeek).to.be(d.getDay());

    d = new Date(3013, 3, 1, 0, 0, 0, 0);
    d2 = Utils.getGregorianDateFromFixedDate(Utils.getFixedDate(3013, 3, 1));
    expect(d2.year).to.be(d.getFullYear());
    expect(d2.month).to.be(d.getMonth());
    expect(d2.dayOfMonth).to.be(d.getDate());
    expect(d2.dayOfWeek).to.be(d.getDay());
  });
});
