import './spends.css';
import { useEffect, useState } from 'react';
import Chart from '../charts/chart';
import PlusOne from "@material-ui/icons/Add";
import { Modal,Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Axios from 'axios';

//import Expenses_Column from '../global-consts/expenses_tb_column';
//import Category_Column from '../global-consts/category_tb_column';
import '../global-consts/base_url';
import DeleteIcon from "@material-ui/icons/DeleteOutlineRounded";
import DataTable from "react-data-table-component";
import SortIcon from "@material-ui/icons/ArrowDownward";
import Card from "@material-ui/core/Card";


export default function Expenses(){

    //input fileds states
    const[title,setTitle]=useState('');
    const[amount,setAmount]=useState('');
    const[category,setCategory]=useState('Food');
    const[description,setDescription]=useState('');

    //render flag
    const[rendflag,setRendFlag]=useState(false);

     //chart type
    const[chart_type,setChartType]=useState('Interval');
   
    //input field for add category modal
    const[categoryvalue,setCategoryValue]=useState('');

    const[addcategoryflag,setAddCategoryFlag]=useState(false);
    
    //add expenses modal states
    const [show, setShow] = useState(false);
    const handleClose = () => {setShow(false);clearFields();};
    const handleShow = () => setShow(true);

    //add category modal states
    const [catshow, setCatShow] = useState(false);
    const handleCatClose = () => {setCatShow(false);clearCatFields();};
    const handleCatShow = () => setCatShow(true);

    //button hide state
    const [btnhide, setBtnHide] = useState(false);
    const [btncathide, setCatBtnHide] = useState(false);

    //expenses table data
    const [expdata,setExpData] = useState([]);
    //category table data
    const [categorydata,setCategoryData] = useState([]);
    //category table data
    const [expense_data_by_cat,setExpenseDataByCat] = useState([]);

    //table select
    const [tableselect,setTableSelect] = useState('Expenses');

    //total expenses
    const [total_expenses,setTotalExpenses] = useState(0);

    // category table columns
    const category_tb_column=[
        {
          id: 1,
          name: "Category Name",
          selector: (row) => row.Category_Name,
          sortable: true,
          reorder: true
        },
        {
          id: 2,
          name: "Date",
          selector: (row) => row.Created_Date,
          sortable: true,
          reorder: true
        },
        {
            id:3,
            name: "Action",
            cell: row => (
                <button 
                    className='del-icon'
                    onClick={()=>deleteCategory(row.ID)}>
                       <DeleteIcon aria-label="delete" color="primary"/>
                </button>
              )
          }
      ];

    //expenses table columns
    const expenses_tb_column=[
        {
          id: 1,
          name: "Title",
          selector: (row) => row.Title,
          sortable: true,
          reorder: true
        },
        {
          id: 2,
          name: "Amount",
          selector: (row) => row.Amount,
          sortable: true,
          reorder: true
        },
        {
          id: 3,
          name: "Date",
          selector: (row) => row.Created_Date,
          sortable: true,
          right: true,
          reorder: true
        },
        {
            id:4,
            name: "Action",
            cell: row => (
                <button 
                    className='del-icon'
                    onClick={()=>deleteExpenses(row.ID)}>
                       <DeleteIcon aria-label="delete" color="primary"/>
                </button>
              )
          }
      ];
    

    
    useEffect(()=>{

        //fetching total expenses count
        
        Axios.get(global.web_url+'Get_Total_Expense_Count.php').then(function(response){
            console.log(response.data);
            setTotalExpenses(response.data);
        }).catch(function(error){
            console.log(error);
        })

        //fetching expense data
       Axios.get(global.web_url+'Get_Expense_Data.php').then(function(response){
            console.log(response.data);
            setExpData(response.data);
       }).catch(function(error){
           console.log(error);
       })

       //fetching category data
       Axios.get(global.web_url+'Get_Category_Data.php').then(function(response){
            console.log(response.data);
            setCategoryData(response.data);
        }).catch(function(error){
            console.log(error);
        })

        //fetching total expenses by category 
        Axios.get(global.web_url+'Get_Sum_Of_Category.php').then(function(response){
            console.log(response.data);
            setExpenseDataByCat(response.data);
        }).catch(function(error){
            console.log(error);
        })

    },[rendflag])



    //push category data
    async function addCategory(){

        setCatBtnHide(true);
        if(categoryvalue==='')
        {
            alert('please fill the details');
        }
        else{

            const a_url=global.web_url+'Set_Category_Data.php';
            let formdata=new FormData();
            formdata.append('Category',categoryvalue);
            const res=await Axios.post(a_url,formdata);
            if(res.data==='success'){clearCatFields();alert('added successfully');setRendFlag(!rendflag)}
            else{clearCatFields();alert(res.data);}
        }
        setCatBtnHide(false);

    }

    //push expense data
    async function addExpenses(){

        setBtnHide(true);
        if(title==='' || amount==='' || category==='' || description==='')
        {
            alert('please fill the details');
        }
        else{

            const a_url=global.web_url+'Set_Expense_Data.php';
            let formdata=new FormData();
            formdata.append('Title',title);
            formdata.append('Amount',amount);
            formdata.append('Category',category);
            formdata.append('Description',description);
            const res=await Axios.post(a_url,formdata);
            if(res.data==='success'){clearFields();alert('added successfully');setRendFlag(!rendflag)}
            else{clearFields();alert('failed to add');}
        }
        setBtnHide(false);
        //handleClose();
    }

    //clear expense input fields
    const clearFields=()=>{
        setTitle('');
        setAmount('');
        setCategory('');
        setDescription('');
    }

    //clear category input fields
    const clearCatFields=()=>{
        setCategoryValue('');
    }

    //delete
    async function deleteCategory(row_id){
        //alert(row_id);
        const a_url=global.web_url+'Delete_Category_By_ID.php';
            let formdata=new FormData();
            formdata.append('ID',row_id);
            const res=await Axios.post(a_url,formdata);
            if(res.data==='success'){alert('deleted successfully');setRendFlag(!rendflag)}
            else{alert(res.data);}
    }

    async function deleteExpenses(row_id){
        //alert(row_id);
        const a_url=global.web_url+'Delete_Expenses_By_ID.php';
            let formdata=new FormData();
            formdata.append('ID',row_id);
            const res=await Axios.post(a_url,formdata);
            if(res.data==='success'){alert('deleted successfully');setRendFlag(!rendflag)}
            else{clearFields();alert('failed to delete');}
    }

    return(
        <div className="exp-container">
             <div className="root">
                <h2 className='exp-title'>Analytics</h2>
                <div className="exp-chart-container">
                    <span className='sub-title-left'>Expenses per category</span>
                    <span className='sub-title-right'>Total:{total_expenses}</span>
                    <br/>
                    <br/>
                  
                    <select 
                        className='ex-select ex-select-t'
                        onChange={(e)=>setChartType(e.target.value)}
                        >
                        <option value="">Please Select Chart</option>
                        <option value="Lader Line Chart">Lader Line Chart </option>
                        <option selected value="Interval">Interval</option>
                        <option value="Rose Chart">Rose Chart</option>
                    </select>
                    <Chart gdata={expense_data_by_cat} type={chart_type}/>
                   
                </div>
                <br/>
                <div className="ex-data-container">

                    <select 
                        className='ex-select'
                        onChange={(e)=>setTableSelect(e.target.value)}>
                        <option value="Expenses">Expenses</option>
                        <option value="Category">Category</option>
                    </select>                    
                    
                    <br/>

                    {/*expenses table*/}
                    <Card style={{display:tableselect==='Expenses'?'block':'none'}}>
                        <DataTable
                            columns={expenses_tb_column}
                            data={expdata}
                            defaultSortFieldId={1}
                            sortIcon={<SortIcon />}
                            pagination
                        />
                    </Card>

                    {/*category table*/}
                    <Card style={{display:tableselect==='Category'?'block':'none'}}>
                        <DataTable
                            columns={category_tb_column}
                            data={categorydata}
                            defaultSortFieldId={1}
                            sortIcon={<SortIcon />}
                            pagination
                        />
                    </Card>

                </div>

                <br/>
                <Button onClick={handleShow} variant="primary">
                    Add Expenses <PlusOne />
                </Button> &nbsp;&nbsp;
                <Button onClick={handleCatShow} variant="primary">
                    Add Category <PlusOne />
                </Button>

                 {/*add expenses modal*/}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Expenses</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <input 
                            type="text"
                            value={title} 
                            className='ex-input' 
                            placeholder='Enter Title'
                            onChange={(e)=>setTitle(e.target.value)}
                            />
                        <br/>
                        <input 
                            type="number" 
                            value={amount}
                            className='ex-input' 
                            placeholder='Enter Amount'
                            onChange={(e)=>setAmount(e.target.value)}/>
                        <br/>
                        <textarea 
                            className='ex-input' 
                            placeholder='Enter Description'
                            value={description}
                            onChange={(e)=>setDescription(e.target.value)}>
                               
                        </textarea>
                        <br/>
                        <select 
                            className='ex-select2'
                            onChange={(e)=>setCategory(e.target.value)}
                            >
                            <option value="">Please Select Category</option>
                            <option value="1">Food</option>
                            <option value="2">Travel</option>
                            <option value="3">Shoping</option>
                            <option value="4">Others</option>
                        </select>

                        <br/>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary"  onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" disabled={btnhide}  onClick={addExpenses}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

                {/*add category modal*/}
                <Modal show={catshow} onHide={handleCatClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Category</Modal.Title>
                    </Modal.Header>

                    <Modal.Body>
                        <input 
                            type="text"
                            value={categoryvalue} 
                            className='ex-input' 
                            placeholder='Enter Category'
                            onChange={(e)=>setCategoryValue(e.target.value)}
                            />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary"  onClick={handleCatClose}>
                            Close
                        </Button>
                        <Button variant="primary" disabled={btnhide}  onClick={addCategory}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>

            </div>
        </div>
    )
}