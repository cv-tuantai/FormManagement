import { CHOOSE_SEAT, REMOVE_TICKET } from "./constants";

const initialState = {
  bookingTickets: [],
};

const bookTicketsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHOOSE_SEAT: {
      let bookingTicketsClone = [...state.bookingTickets];

      const index = bookingTicketsClone.findIndex(
        (seat) => seat.soGhe === action.payload.soGhe,
      );

      if (index !== -1) {
        // nếu ghế đã chọn thì sẽ xóa
        bookingTicketsClone.splice(index, 1);
      } else {
        // nếu ghế chưa chọn sẽ đưa vào mảng
        bookingTicketsClone.push(action.payload);
      }

      // cập nhật state
      state.bookingTickets = bookingTicketsClone;
      return { ...state };
    }

    case REMOVE_TICKET: {
      let bookingTicketsClone = [...state.bookingTickets];

      const index = bookingTicketsClone.findIndex(
        (ticket) => ticket.soGhe === action.payload,
      );

      // nếu đã có thì xóa
      if (index !== -1) {
        bookingTicketsClone.splice(index, 1);
      }

      state.bookingTickets = bookingTicketsClone;

      return { ...state };
    }

    default:
      return { ...state };
  }
};

export default bookTicketsReducer;
