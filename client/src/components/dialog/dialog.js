import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Axios from "axios";

export default function FormDialog(props) {

    const [editValues, setEditValues] = useState({
        name: props.name,
        cost: props.cost,
        category: props.category
    });
    
    const handleEditGame = () => {
        Axios.put("http://localhost:3001/edit", {
            id: props.id,
            name: editValues.name,
            cost: editValues.cost,
            category: editValues.category
        })
        handleClose();
    }

    const handleDeleteGame = () => {
        Axios.delete(`http://localhost:3001/delete/${props.id}`);
        handleClose();
    }

    const handleClickOpen = () => {
        props.setOpen(true);
    };

    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeValues = value => {
        setEditValues(prevValue => ({
            ...prevValue,
            [value.target.id]: value.target.value
        }));
    }

    return (
        <Dialog open={props.open} onClose={handleClose}>
            <DialogTitle>Editar</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    id="name"
                    label="Nome do jogo"
                    defaultValue={props.name}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="cost"
                    label="Preço"
                    defaultValue={props.cost}
                    onChange={handleChangeValues}
                    type="text"
                    fullWidth
                />
                <TextField
                    autoFocus
                    margin="dense"
                    id="category"
                    label="Categoria"
                    onChange={handleChangeValues}
                    defaultValue={props.category}
                    type="text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleDeleteGame}>Excluir</Button>
                <Button onClick={handleEditGame}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}