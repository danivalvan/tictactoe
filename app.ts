module TicTacToe {
	export class App {
		static selected: string;
		p1_sign: string;
		p2_sign: string;
		p1_turn: boolean;
		table: JQuery;
		table_cells: Array<Array<number>>;

		constructor() {
			this.p1_turn = true;
			this.table = $("#table");
			this.table_cells = [];
			this.init_table_cells();
			var self: TicTacToe.App = this;
			$("#select_X").on("click", function () {
				self.p1_sign = "X";self.p2_sign = "O";$('#mymodal').modal('hide')
			});
			$("#select_O").on("click", function () {
				self.p1_sign = "O";self.p2_sign = "X";$('#mymodal').modal('hide')
			});
			for (var i = 0; i < 3; i++) {
				for (var j = 0; j < 3; j++) {

					var div = document.createElement("div");
					div.setAttribute('data-col', "" + j);
					div.setAttribute('data-row', "" + i);
					div.setAttribute("class", "block");
					this.table.append(div);
				}
			}
			$(".block").on("click", function () {
				self.block_click($(this));
			});
		}

		init_table_cells() {
			for (var x = 0; x < 3; x++) {
				this.table_cells[x] = [];
				for (var y = 0; y < 3; y++) {
					this.table_cells[x][y] = 0;
				}
			}
		}

		block_click(obj: JQuery) {
			if (this.p1_turn) {
				if (this.table_cells[obj.data("row")][obj.data("col")] === 0) {
					obj.html(this.p1_sign);
					this.table_cells[obj.data("row")][obj.data("col")] = 1;
					this.p1_turn = !this.p1_turn;
				}
			} else {
				if (this.table_cells[obj.data("row")][obj.data("col")] === 0) {
					obj.html(this.p2_sign);
					this.table_cells[obj.data("row")][obj.data("col")] = 2;
					this.p1_turn = !this.p1_turn;
				}
			}
			this.check_fckr();
			if (this.p1_turn) {
				$("#whos_turn").html("player 1 ");
			} else {
				$("#whos_turn").html("player 2 ");
			}
		}

		check_fckr() {
			console.log(this.table_cells);
			for (var i = 0; i < 3; i++) {
				if (this.table_cells[0][i] === this.table_cells[1][i] &&
					this.table_cells[1][i] === this.table_cells[2][i]) {
					return this.show_winner(this.table_cells[0][i]) ? true: false;
				}

				if (this.table_cells[i][0] === this.table_cells[i][1] &&
					this.table_cells[i][1] === this.table_cells[i][2]) {
					return this.show_winner(this.table_cells[i][0]) ? true : false;
				}
			}
			if (this.table_cells[0][0] === this.table_cells[1][1] &&
				this.table_cells[1][1] === this.table_cells[2][2]) {
				return this.show_winner(this.table_cells[0][0]) ? true : false;
			}
			if (this.table_cells[0][2] === this.table_cells[1][1] &&
				this.table_cells[1][1] === this.table_cells[2][0]) {
				return this.show_winner(this.table_cells[0][2]) ? true : false;
			}
			
			var found: boolean = false;
			for (var x = 0; x < 3; x++) {
				for (var y = 0; y < 3; y++) {
					if (this.table_cells[x][y] === 0) {
						found = true;
						break;
					} 
				}
			}
			if (!found) {
				alert("játék vége!");
				window.location.href = window.location.href;
			}
		}

		show_winner(table_cell) {
			if (table_cell === 1) {
				alert("1-es játékos nyert!");
				window.location.href = window.location.href;
				return true;
			} else if (table_cell === 2) {
				alert("2-es játékos nyert!");
				window.location.href = window.location.href;
				return true;
			}
		}
	}
}

window.onload = () => {
	var app = new TicTacToe.App();
    $("#mymodal").modal({ show: true, backdrop: 'static', keyboard: false });
};