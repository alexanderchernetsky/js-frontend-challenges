import ToDoModel from '../models/ToDoModel.js';
import ToDoView from '../views/ToDoView.js';

// Connects view ↔ model
// Handles events
// Updates the view
class ToDoController {
    constructor() {
        this.model = new ToDoModel();
        this.view = new ToDoView();
    }

    run() {
        console.log('ToDoController running');
        this.view.renderItems(this.model.items);

        this.view.listenToAddItemEvent(text => {
            this.model.addItem(text);
            this.view.renderItems(this.model.items);
        });
        this.view.listenToRemoveItemEvent(id => {
            this.model.removeItem(id);
            this.view.renderItems(this.model.items);
        });
    }
}


export default ToDoController;
