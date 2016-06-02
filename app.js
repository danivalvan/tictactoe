var TicTacToe;
(function (TicTacToe) {
    var App = (function () {
        function App() {
            this.p1_turn = true;
            this.table = $("#table");
            this.table_cells = [];
            this.init_table_cells();
            var self = this;
            $("#select_X").on("click", function () {
                self.p1_sign = "X";
                self.p2_sign = "O";
                $('#mymodal').modal('hide');
            });
            $("#select_O").on("click", function () {
                self.p1_sign = "O";
                self.p2_sign = "X";
                $('#mymodal').modal('hide');
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
        App.prototype.init_table_cells = function () {
            for (var x = 0; x < 3; x++) {
                this.table_cells[x] = [];
                for (var y = 0; y < 3; y++) {
                    this.table_cells[x][y] = 0;
                }
            }
        };
        App.prototype.block_click = function (obj) {
            if (this.p1_turn) {
                if (this.table_cells[obj.data("row")][obj.data("col")] === 0) {
                    obj.html(this.p1_sign);
                    this.table_cells[obj.data("row")][obj.data("col")] = 1;
                    this.p1_turn = !this.p1_turn;
                }
            }
            else {
                if (this.table_cells[obj.data("row")][obj.data("col")] === 0) {
                    obj.html(this.p2_sign);
                    this.table_cells[obj.data("row")][obj.data("col")] = 2;
                    this.p1_turn = !this.p1_turn;
                }
            }
            this.check_fckr();
            if (this.p1_turn) {
                $("#whos_turn").html("player 1 ");
            }
            else {
                $("#whos_turn").html("player 2 ");
            }
        };
        App.prototype.check_fckr = function () {
            console.log(this.table_cells);
            for (var i = 0; i < 3; i++) {
                if (this.table_cells[0][i] === this.table_cells[1][i] &&
                    this.table_cells[1][i] === this.table_cells[2][i]) {
                    return this.show_winner(this.table_cells[0][i]) ? true : false;
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
            var found = false;
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
        };
        App.prototype.show_winner = function (table_cell) {
            if (table_cell === 1) {
                alert("1-es játékos nyert!");
                window.location.href = window.location.href;
                return true;
            }
            else if (table_cell === 2) {
                alert("2-es játékos nyert!");
                window.location.href = window.location.href;
                return true;
            }
        };
        return App;
    })();
    TicTacToe.App = App;
})(TicTacToe || (TicTacToe = {}));
window.onload = function () {
    var app = new TicTacToe.App();
    $("#mymodal").modal({ show: true, backdrop: 'static', keyboard: false });
};
//# sourceMappingURL=app.js.map