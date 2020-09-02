function memo() {
  const submit = document.getElementById("submit");　//　③投稿するボタンの情報を取得
  submit.addEventListener("click", (e) => {　//　④投稿するボタンをclick時に実行される関数を定義
    const formData = new FormData(document.getElementById("form")); //⑧フォームに入力された値を取得
    const XHR = new XMLHttpRequest();　// ⑤オブジェクトを生成
    XHR.open("POST", "/posts", true); //⑥オープンメソッドを使用　リクエスト内容を引数に追記　（HTTP通信　パス　非同期通信）
    XHR.responseType = "json";　//⑦レスポンスの形式を定義
    XHR.send(formData); //⑧リクエストを送信
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      } //既読機能の実装時と同じように200以外のHTTPステータスが返却された場合の処理
      const item = XHR.response.post;　//レスポンスとして返却されたメモのレコードを取得
      const list = document.getElementById("list");　//描画する親要素のlistの要素を取得
      const formText = document.getElementById("content"); //メモの入力フォームをリセット（リセット対象であるcontentという要素を取得）
      const HTML = ` 
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;　//メモとして描画するHTMLを定義
      list.insertAdjacentHTML("afterend", HTML); //list要素の直後にHTMLを追加
      formText.value = ""; //メモの入力フォームに入力された文字がリセット(空の文字列に上書き)
    }; // ⑨HTMLのメモ部分を描画する処理
    e.preventDefault(); //⑩プログラムの処理が重複を止める(createアクションと、JavaScriptの処理が重複しているため)
  });
}
//  ①メモという関数定義

window.addEventListener("load", memo);
// ②windowを読み込み時に実行される

//非同期通信でのメモ投稿機能の実装