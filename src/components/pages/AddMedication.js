import { Form, Badge, Row, Col, Container, Button, FloatingLabel } from 'react-bootstrap';
import { useState } from 'react';
import { useHistory, useParam } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ref, child, get, set } from 'firebase/database';
import database from '../../firebase-config';


const AddMedication = () => {

    const initialValue = {
      Tablet:''
    };
    const initialChecked={
        Morning:'',
        Afternoon:'',
        Evening:'',
    }

    const dosage=[1,2,3];

    const history = useHistory();
    

    const [formValue, setFormValue] = useState(initialValue);
    const [isChecked, setIsChecked] = useState(initialChecked);
    const [isSubmit, setIsSubmit] = useState(false);

    const handleTabletChange = (e) => {
      const { id, value } = e.target;
      setFormValue({ ...initialValue, [id]: value });
    };

    console.log(formValue);

    const handleChange = (prop) =>{

        if(prop===1)
        {
            setIsChecked({...isChecked,Morning:formValue.Tablet});
        }
        if (prop === 2) {
          setIsChecked({ ...isChecked, Afternoon: formValue.Tablet });
        }
        if (prop === 3) {
          setIsChecked({ ...isChecked, Evening: formValue.Tablet });
        }
    }

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmit(true);

      if (setIsSubmit) {
        set(ref(database, `MedicineData/`), {
          ...isChecked,
        })
          .then(() => {
            toast.success('data stored');
          })
          .catch((error) => {
            alert('failed');
          });
        setTimeout(() => history.push('/AllUsers'), 500);
      }
    };

    console.log(isChecked)

    return (
      <div className='container mt-5'>
        <h1>
          <Badge bg='secondary'>Add Medication</Badge>
        </h1>
        <Form onSubmit={handleSubmit}>
          <Container className='mt-5'>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='Tablet'>
                  <Form.Label>Tablet</Form.Label>
                  <Form.Control
                    className='col-4'
                    type='text'
                    value={formValue.Tablet}
                    onChange={handleTabletChange}
                    placeholder='Enter Tablet'
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Label>Add Dosage</Form.Label>
                <div key={`inline-checkbox`}>
                  <Form.Check
                    inline
                    label='Morning'
                    name='group1'
                    onChange={() => handleChange(dosage[0])}
                    checked={isChecked.Morning}
                    id={`inline-checkbox-1`}
                  />
                  <Form.Check
                    inline
                    label='Afternoon'
                    name='group1'
                    onChange={() => handleChange(dosage[1])}
                    checked={isChecked.Afternoon}
                    id={`inline-checkbox-2`}
                  />
                  <Form.Check
                    inline
                    label='Evening'
                    name='group1'
                    onChange={() => handleChange(dosage[2])}
                    checked={isChecked.Evening}
                    id={`inline-checkbox-3`}
                  />
                </div>
              </Col>
            </Row>
            <div
              className='formButton'
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                size='lg'
                className='mt-3'
                variant='primary'
                type='submit'
              >
                Add Tablet
              </Button>
            </div>
          </Container>
        </Form>
      </div>
    );
}

export default AddMedication;

