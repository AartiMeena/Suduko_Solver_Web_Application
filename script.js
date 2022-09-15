var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
	for (var j = 0; j < 9; j++) {
		arr[i][j] = document.getElementById(i * 9 + j);

	}
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
	for (var i = 0; i < 9; i++) {
		for (var j = 0; j < 9; j++) {
			if (board[i][j] != 0) {
				arr[i][j].innerText = board[i][j]
			}

			else
				arr[i][j].innerText = ''
		}
	}
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
	var xhrRequest = new XMLHttpRequest()
	xhrRequest.onload = function () {
		var response = JSON.parse(xhrRequest.response)
		console.log(response)
		board = response.board
		FillBoard(board)
	}
	xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
	//we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
	xhrRequest.send()
}

SolvePuzzle.onclick = () => {
	SudokuSolver(board, 0, 0, 9);
};

function isValid(board,i,j,num,n)
{
	//row and col checks
	for(let x=0;x<n;x++)
	{
		if(board[i][x]==num || board[x][j]==num)
		{
			return false;
		}
	}
}

function SudokuSolver(board,i,j,n)
{
	 if(i==n)
	 {
		FillBoard(board);//fill board
		return true;
	 }

	 //if we are not inside the board
	 if(j==n)
	 {
		return SudokuSolver(board,i,j+1,n);
	 }

	 //if cell is already filled ->just move ahead
	 if(board[i][j]!=0)
	 {
		return SudokuSolver(board,i,j+1,n);
	 }

	 for(let num=1;num<=9;num++)
	 {
		//check is num can be filled
		if(isValid(board,i,j,num,n))
		{
			board[i][j]=num;
			let subAns=SudokuSolver(board,i,j+1,n);
			if(subAns)
			{
				return true;
			}
			board[i][j]=0;
		}
	 }

	 return false;
}
