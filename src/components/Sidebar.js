import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './sidebar/sidebar.css'
import { GoChevronLeft } from 'react-icons/go'
import { BsCircleFill } from 'react-icons/bs'
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';

const API_URL = "https://webhook.site/50fa0e52-6245-47e1-a971-6ea9442b7cfc"

const Sidebar = () => {


    let scemaData = [
        {
            label: "First Name",
            value: "first_name",
            color:"green",
        },
        {
            label: "Last Name",
            value: "last_name",
            color:"green",
        },
        {
            label: "Gender",
            value: "gender",
            color:"green",
        },
        {
            label: "Age",
            value: "age",
            color:"green",
        },
        {
            label: "Account Name",
            value: "account_name",
            color:"pink",
        },
        {
            label: "City",
            value: "city",
            color:"green",
        },
        {
            label: "State",
            value: "state",
            color:"green",
        },
    ]



    const [show, setShow] = useState(false);
    const [items, setItems] = useState([]);
    const [objs, setobj] = useState([]);
    const [schemaQuery, setSchemaQuery] = useState({
        segment: "",
        schemas: ""
    })


    const handleClose = () => {
        setShow(false);
        setSchemaQuery({
            segment: "",
            schemas: ""
        });
        setItems([]);
        setobj([])

    }
    const handleShow = () => setShow(true);



    const handleChange = ({ target: { name, value } }) => {

        setSchemaQuery({ ...schemaQuery, [name]: value });
    }




    const handleAdd = (e) => {
        e.preventDefault();
        let exit = items.find((currEle) => currEle.value === schemaQuery.schemas);
        let filterData = scemaData.find((currEle) => currEle.value === schemaQuery.schemas);
        if (schemaQuery.schemas == "no value" || schemaQuery.schemas == "" || schemaQuery.schemas == null || schemaQuery.schemas == null) {
            alert("please select any options")
        } else {
            if (exit) {
                alert("already exit");
            }
            else {
                var obj = {}
                let a = filterData.value;
                let b = filterData.label;
                obj[a] = b;

                setobj([...objs, obj])
                setItems([...items, filterData]);
                setSchemaQuery({
                    ...schemaQuery,
                    schemas: ""
                })

            }
        }
    }

    const handleDelete = (indexs) => {
        let updateItems = items.filter((currEle, index) => index !== indexs);
        let updateobj = objs.filter((currEle, index) => index !== indexs);
        setItems(updateItems);
        setobj(updateobj);
    }

    const hanldeSubmit = async () => {
        if (items.length > 0) {
            let formData = {
                segment_name: schemaQuery.segment,
                schema: objs
            }

            let result = await axios.post(`${API_URL}`, formData);
            if (result) {
                alert("data send to server");
                setSchemaQuery({
                    segment: "",
                    schemas: ""
                });
                setItems([]);
                setobj([]);
            }
        }
        else{
            alert("Add Schema")
        }

    }
console.log(items)


    return (
        <div className='form_scrool'>
            <Button variant="primary" onClick={handleShow} className="m-5">
                Save segment
            </Button>

            <Offcanvas show={show} onHide={handleClose} placement="end" className="">
                <Offcanvas.Header >
                    <Offcanvas.Title><GoChevronLeft className='left_arrow' /> Saving Segment</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <section >
                        <Form onSubmit={(e) => handleAdd(e)}>
                            <Form.Label className='h6 mb-3'>Enter the Name of the Segment </Form.Label>
                            <Form.Control type="text" placeholder="Name of the Segment" name="segment" onChange={handleChange} value={schemaQuery.segment} required />
                            <p className='h6 my-4'>
                                To save your segment, you need to add the schemas to build your query
                            </p>
                            <div className="d-flex align-items-center justify-content-end">
                                <p><span className='mx-3'><BsCircleFill style={{color:"#48dd48"}}/> -User Traits</span>   <span><BsCircleFill style={{color:"#dd487f"}}/> -Group Traits</span></p>
                            </div>
                            <Row>




                                {
                                    items?.length > 0 ? items.map((currEle, index) => {
                                        return (
                                            <>
                                                <Col md='12' className='d-flex align-items-center justify-content-center'>
                                                <p><span className='mx-2'><BsCircleFill className={currEle.color=="green"?"green":"pink"}/></span></p> 
                                                    <Form.Select aria-label="Default select example" name="schemas" className='my-3'>

                                                        <option value={currEle.value} >
                                                            {currEle.label}
                                                        </option>
                                                    </Form.Select>


                                                    <span className='delete_btn' onClick={() => handleDelete(index)}>
                                                        -
                                                    </span>
                                                </Col>
                                            </>
                                        )

                                    }) : null
                                }
                          <Col md="12"  className='d-flex align-items-center justify-content-center'>
                          <p><span className='mx-2'><BsCircleFill style={{color:"rgb(184 191 184)"}}/></span></p> 
                            <Form.Select aria-label="Default select example" name="schemas" onChange={handleChange} value={schemaQuery.schemas}>
                                <option value={"no value"}>Add schema to segment</option>
                                {
                                    scemaData.map((currEle) => {
                                        return (
                                            <>
                                                <option value={currEle.value} name={currEle.label}>
                                                    {currEle.label}
                                                </option>
                                            </>
                                        )

                                    })
                                }
                            </Form.Select>
                            </Col>  </Row>
                            <button type='submit' className='btn btn-transprent add_schema_btn'>+Add new schema</button>




                        </Form>
                    </section>



                </Offcanvas.Body>
                <section>
                    <div className="offcanvas-footer py-5">
                        <div className="offcanvas_content">

                            <button className='btn btn-info mx-3 text-white' onClick={hanldeSubmit}>Save the Segment</button>
                            <button className='btn text-danger' onClick={handleClose}>Cancel</button>
                        </div>
                    </div>
                </section>
            </Offcanvas>
        </div >
    )
}

export default Sidebar