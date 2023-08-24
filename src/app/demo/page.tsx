'use client'
import Clock from '../components/clock';
import { useState, useEffect, useMemo, useCallback, ChangeEvent } from 'react';
import { debounce } from 'lodash';

export default function About() {
  const [birth, setBirth] = useState(1989)
  const [age, setAge] = useState(80)
  const [sickAge, setSickAge] = useState(5)
  const [graduationAge, setGraduationAge] = useState(20)


  const [clockBirth, setClockBirth] = useState(new Date(birth, 0, 1))
  const [clockDeath, setClockDeath] = useState(new Date(birth + age, 0, 1))
  const [clockSickAge, setClockSickAge] = useState(new Date(birth + age - sickAge, 0, 1))
  const [clockGraduationAge, setClockGraduationAge] = useState(new Date(birth + graduationAge, 0, 1))

  const handleBirthChange = (e: ChangeEvent<HTMLInputElement>) => {
    let birth = parseInt(e.target.value.slice(0, 4))
    setBirth(birth)
    birth = !Number.isNaN(birth) ? birth : 0
    debounceUpdateClock(birth, age, sickAge, graduationAge)
  }

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let age = parseInt(e.target.value.slice(0, 2))
    setAge(age)
    age = !Number.isNaN(age) ? age : 0
    debounceUpdateClock(birth, age, sickAge, graduationAge)
  }

  const handleSickAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let sickAge = parseInt(e.target.value.slice(0, 2))
    setSickAge(sickAge)
    sickAge = !Number.isNaN(sickAge) ? sickAge : 0
    debounceUpdateClock(birth, age, sickAge, graduationAge)
  }

  const handleGraduationAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    let graduationAge = parseInt(e.target.value.slice(0, 2))
    setGraduationAge(graduationAge)
    graduationAge = !Number.isNaN(graduationAge) ? graduationAge : 0
    debounceUpdateClock(birth, age, sickAge, graduationAge)
  }

  const debounceUpdateClock = useMemo(() => debounce((birth: number, age: number, sickAge: number, graduationAge: number) => {
    setClockBirth(new Date(birth, 0, 1))
    setClockDeath(new Date(birth + age, 0, 1))
    setClockSickAge(new Date(birth + age - sickAge, 0, 1))
    setClockGraduationAge(new Date(birth + graduationAge, 0, 1))
  }, 1000), [setClockSickAge])

  useEffect(() => {
    return () => debounceUpdateClock.cancel()
  }, [])

  return (
    <main className="text-center flex flex-col items-center">


      <div className="p-2 text-center text-2xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-600">
        <label>Let's say you were born in the year</label>
        <input className='w-[4ch] bg-transparent border-b-2 border-slate-500 block m-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type='number' maxLength={4} value={birth} onChange={handleBirthChange} />
        <label> and you are expected to be dead at an age of </label>
        <input className='w-[2ch] bg-transparent border-b-2 border-slate-500 block m-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none' type="number" maxLength={3} value={age} onChange={handleAgeChange} />
        <div>This will be the clock of your life</div>
      </div>

      <Clock timeline={{ name: 'Life', start: clockBirth, end: clockDeath }} />

      <div className="p-2 text-center text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-600">
        <label>Factoring in the last</label>
        <input className='w-[2ch] bg-transparent border-b-2 border-slate-500 block m-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          type='number' maxLength={2} value={sickAge} onChange={handleSickAgeChange} />
        <label>years of your life being somewhat sick: </label>
      </div>

      <Clock timeline={{
        name: 'Life and old age',
        start: clockBirth,
        end: clockDeath,
        ranges: [{
          name: 'Sickness', 
          color: '#700000',
          start: clockSickAge,
          end: clockDeath
        }]
      }} />

      <div className="p-2 text-center text-xl bg-clip-text text-transparent bg-gradient-to-r from-violet-500 to-blue-600">
        <label>Plus the first</label>
        <input className='w-[2ch] bg-transparent border-b-2 border-slate-500 block m-auto [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none'
          type='number' maxLength={2} value={graduationAge} onChange={handleGraduationAgeChange} />
        <label>years of your life studying </label>
      </div>

      <Clock timeline={{
        name: 'Life and old age',
        start: clockBirth,
        end: clockDeath,
        ranges: [{
          name: 'Sickness', 
          color: '#700000',
          start: clockSickAge,
          end: clockDeath
        },
        {
          name: 'Study',
          color: '#abcdef',
          start: clockBirth,
          end: clockGraduationAge
        }]
      }} />

    </main>
  )
}