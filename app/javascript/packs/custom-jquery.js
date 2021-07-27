$.fn.sortChildren = function(attr_name) {
  this
    .children()
    .sort((a,b) => $(b).data(attr_name) < $(a).data(attr_name) ? -1 : $(a).data(attr_name) < $(b).data(attr_name) ? 1 : 0)
    .appendTo(this);

  return this;
}