import React, { useState } from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import style from './Calculator.module.css'

function Calculator() {
    const { Group, Control, Label } = Form

    const [weight, setWeight] = useState(0)
    const [height, setHeight] = useState(0)
    const [bmi, setBmi] = useState('')
    const [message, setMessage] = useState('')
    const [healthyWeight, setHealthyWeight] = useState('')
    const [range, setRange] = useState('')
    
    let calBmi = (e) => {
        e.preventDefault()

        const container = document.getElementById('container')
        const messageEl = document.getElementById('message-el')
        
        if(weight === 0 || height === 0) {
            alert('Please enter a valid weight & height')
        }
        else {
            let heightInMeter = (height / 100).toFixed(2)
            let bmi = (weight /(heightInMeter * heightInMeter))
            //min normal bmi value
            let minBmi = 18.5

            //max normal bmi value
            let maxBmi = 25 

            // min weight required for underweight category for normal weight 
            let minWeightCal = (minBmi * (heightInMeter * heightInMeter))
            let minWeight = Math.ceil(minWeightCal * 100) / 100

            // min weight required for overweight category for normal weight
            let maxWeightCal = (maxBmi * (heightInMeter * heightInMeter))
            let maxWeight = Math.floor(maxWeightCal * 100) / 100

            let reqWeightCal = 0
            let reqWeight = 0
            setBmi(bmi.toFixed(1))
            
            // bmi check for underweight
            if(bmi >= 9 && bmi < 18.5) {
                if( bmi >= 9 && bmi < 15) {
                    setMessage('very severely underweight')
                    reqWeightCal = minWeight - weight
                    reqWeight = ((reqWeightCal * 100) / 100).toFixed(2)
                    setHealthyWeight(`+${reqWeight} kgs for healthy weight`)
                    setRange(`${minWeight} - ${maxWeight}`)
                    container.className = ''
                    container.classList.add('bg-warning')
                    messageEl.className = ''
                    messageEl.classList.add('text-warning')
                }
                else if (bmi >= 15 && bmi < 16) {
                    setMessage('severely underweight')
                    reqWeightCal = minWeight - weight
                    reqWeight = ((reqWeightCal * 100) / 100).toFixed(2)
                    setHealthyWeight(`+${reqWeight} kgs for healthy weight`)
                    setRange(`${minWeight} - ${maxWeight}`)
                    container.className = ''
                    container.classList.add('bg-warning') 
                    messageEl.className = ''
                    messageEl.classList.add('text-warning')
                }
                else{
                    setMessage('underweight')
                    reqWeightCal = minWeight - weight
                    reqWeight =  ((reqWeightCal * 100) / 100).toFixed(2)
                    setHealthyWeight(`+${reqWeight} kgs for healthy weight`)
                    setRange(`${minWeight} - ${maxWeight}`)
                    container.className = ''
                    container.classList.add('bg-warning')
                    messageEl.className = ''
                    messageEl.classList.add('text-warning')
                }
            }
            // bmi check for normal
            else if(bmi >= 18.5 && bmi <= 25) {
                setMessage('normal')
                setHealthyWeight(`Healthy weight`)
                setRange(`${minWeight} - ${maxWeight}`)
                container.className = ''
                container.classList.add('bg-success')
                messageEl.className = ''
                messageEl.classList.add('text-success')
            }
            // bmi check for overweight
            else if(bmi > 25 && bmi < 50) {
                if (bmi > 25 && bmi < 30){
                    setMessage('overweight')
                    reqWeightCal = weight - maxWeight
                    reqWeight =  ((reqWeightCal * 100) / 100).toFixed(2)
                    setHealthyWeight(`-${reqWeight} kgs for healthy weight`)
                    setRange(`${minWeight} - ${maxWeight}`)
                    container.className = ''
                    container.classList.add('bg-danger')
                    messageEl.className = ''
                    messageEl.classList.add('text-danger')
                } 
                else if(bmi >= 30 && bmi < 35) {
                    setMessage('obese Class I')
                    reqWeightCal = weight - maxWeight
                    reqWeight =  ((reqWeightCal * 100) / 100).toFixed(2)
                    setHealthyWeight(`-${reqWeight} kgs for healthy weight`)
                    setRange(`${minWeight} - ${maxWeight}`)
                    container.className = ''
                    container.classList.add('bg-danger')
                    messageEl.className = ''
                    messageEl.classList.add('text-danger')
                }
                else if(bmi >= 35 && bmi < 40) {
                    setMessage('obese Class II')
                    reqWeightCal = weight - maxWeight
                    reqWeight =  ((reqWeightCal * 100) / 100).toFixed(2)
                    setHealthyWeight(`-${reqWeight} kgs for healthy weight`)
                    setRange(`${minWeight} - ${maxWeight}`)
                    container.className = ''
                    container.classList.add('bg-danger')
                    messageEl.className = ''
                    messageEl.classList.add('text-danger')
                }
                else {
                    setMessage('obese Class III')
                    reqWeightCal = weight - maxWeight
                    reqWeight =  ((reqWeightCal * 100) / 100).toFixed(2)
                    setHealthyWeight(`-${reqWeight} kgs for healthy weight`)
                    setRange(`${minWeight} - ${maxWeight}`)
                    container.className = ''
                    container.classList.add('bg-danger')
                    messageEl.className = ''
                    messageEl.classList.add('text-danger')
                }
            }
            else {
                alert('Please enter a valid weight & height')
                setBmi('')
                setMessage('')
                setHealthyWeight('')
                setRange('')
            }
        }
    }

    return (
        <>  
            <Card style={{ width: "26rem" }} border='light' className='p-4 shadow'>
                <h2 className='text-center mb-3'>BMI Calculator</h2>
                <Form className='mb-3 px-3' onSubmit={calBmi} id='bmiForm'>
                    <Group className='mb-3'>
                        <Label>Weight (kg)</Label>
                        <Control value={weight} onChange={(e) => setWeight(e.target.value)} />
                    </Group>
                    <Group className='mb-4'>
                        <Label>Height (cm)</Label>
                        <Control value={height} onChange={(e) => setHeight(e.target.value)} />
                    </Group>
                    <Button type='submit' variant='primary' className='w-100' id='btn'>Submit</Button>
                </Form>
                <div className='text-center'>
                    <h3 className='mb-0'>BMI</h3>
                    <h3 className={style.font}>{bmi}</h3>
                    <div className="lead">
                        <div id='message-el'>
                            <h5>{message}</h5>
                        </div>
                            <h6>{ healthyWeight }</h6>
                            <h6>{ range }</h6>
                    </div>
                </div>
                <a href="https://github.com/nandanholla" className='text-white text-center text-decoration-none' target="_blank" rel="noopener noreferrer">by nandan</a>
            </Card>
        </>
    )
}

export default Calculator