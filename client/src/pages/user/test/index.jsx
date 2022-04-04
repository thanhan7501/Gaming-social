import React from 'react'

const TestUI = () => {
    return (
        <div className="dashboard container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card">
                        <div className="card-header">
                            <div className="row">
                                <div className="col-lg-2">
                                    <div className="dashboar-avatar">
                                        <img src="https://joeschmoe.io/api/v1/random" width={'40px'} height={'40px'} alt="" />
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="author-infor">
                                        <span class="author-name">AN</span>
                                        <br />
                                        <span class="uploaded-time"> 1 hours
                                            <span>·</span>
                                            <span className="pl-1" color="#999" small>icons</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="col-lg-8">
                                    <div className="row">
                                        <div className="col-lg-5">
                                            <span class="text-small">
                                                <strong>
                                                    <i class="fas fa-building mr-3" />Department:
                                                </strong>
                                                MARKETTING
                                            </span>
                                        </div>
                                        <div className="col-lg-5">
                                            <span class="text-small">
                                                <strong>
                                                    <i class="fas fa-box-open mr-3" />Category:
                                                </strong>
                                                Category
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-body content">
                            <div className="row">
                                <div className='col-12' cols="12">
                                    <h5 class="post-content ml-3">Idea teiel</h5>
                                </div>
                                <div className='row'>
                                    <h5 class="post-content ml-3">Content</h5>
                                </div>
                            </div>
                            <div class="text-center">
								<img
									// width="1168"
									// height="472"
									contain
									src='https://joeschmoe.io/api/v1/random'
								/>
							</div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-lg-3">
                                <div className="p-1" style={{marginBottom: '2px'}}>Likes</div>
									<span className="like-total text-underline">10 Yeu thich</span>
                                </div>
                                <div  class="text-center col-lg-3">
									<span>icons</span>
									<span class="comment-total text-underline"> 20 lượt xem </span>
								</div>
                                
                                <div  class="text-center col-lg-3">
									<span>icons</span>
									<span class="comment-total text-underline">100 bình luận</span>
								</div>

								<div  class="text-center col-lg-3">
								<span>icon</span>
									<span class="share-total text-underline mr-3">200 lượt không thích</span>
								</div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestUI;